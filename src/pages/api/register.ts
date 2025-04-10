import type { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../ormconfig";
import { User } from "../../database/entities/User";
import * as bcrypt from "bcryptjs";

type ResponseData = {
  success: boolean;
  message?: string;
  user?: Omit<User, "passwordHash">;
  error?: string;
};

let retryCount = 0;
const MAX_RETRIES = 3;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Verificar se é uma requisição POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  try {
    // Inicializar conexão com o banco de dados
    if (!AppDataSource.isInitialized) {
      try {
        await connectWithRetry();
        console.log("Conexão com o banco de dados inicializada com sucesso");
      } catch (dbError) {
        console.error(
          "Erro ao inicializar a conexão com o banco de dados:",
          dbError
        );
        return res.status(500).json({
          success: false,
          message: "Erro ao conectar ao banco de dados",
          error: dbError instanceof Error ? dbError.message : String(dbError),
        });
      }
    }

    const { email, nome, sobrenome, password, username } = req.body;

    // Validação básica
    if (!email || !nome || !sobrenome || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
      });
    }

    // Verificar se o email já está em uso
    try {
      const userRepository = AppDataSource.getRepository(User);

      // Verificar se o email já está em uso
      const existingEmail = await userRepository.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Este email já está em uso",
        });
      }

      // Verificar se o username já está em uso
      const existingUsername = await userRepository.findOne({
        where: { username },
      });
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Este nome de usuário já está em uso",
        });
      }

      // Criar hash da senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Criar novo usuário
      const newUser = userRepository.create({
        email,
        nome,
        sobrenome,
        username,
        passwordHash: hashedPassword,
      });

      // Salvar usuário no banco de dados
      await userRepository.save(newUser);

      // Omitir senha do retorno
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userWithoutPassword } = newUser;

      return res.status(201).json({
        success: true,
        message: "Usuário registrado com sucesso",
        user: userWithoutPassword as Omit<User, "passwordHash">,
      });
    } catch (dbQueryError) {
      console.error("Erro na operação do banco de dados:", dbQueryError);
      return res.status(500).json({
        success: false,
        message: "Erro ao processar a operação no banco de dados",
        error:
          dbQueryError instanceof Error
            ? dbQueryError.message
            : String(dbQueryError),
      });
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    // Detalhamento para tipos específicos de erro
    if (error instanceof SyntaxError) {
      return res.status(400).json({
        success: false,
        message: "Erro de sintaxe nos dados fornecidos",
        error: error.message,
      });
    }

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao processar o registro",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      error: String(error),
    });
  }
}

async function connectWithRetry() {
  try {
    if (AppDataSource.isInitialized) {
      return;
    }
    await AppDataSource.initialize();
    retryCount = 0; // Reset retry count on successful connection
  } catch (err) {
    retryCount++;
    if (retryCount < MAX_RETRIES) {
      console.log(
        `Tentativa de conexão ${retryCount} falhou. Tentando novamente...`
      );
      // Esperar um tempo antes de tentar novamente (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      return connectWithRetry();
    }
    console.error(`Falha na conexão após ${MAX_RETRIES} tentativas`);
    throw err;
  }
}
