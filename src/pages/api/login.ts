import type { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../ormconfig";
import { User } from "../../database/entities/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

type ResponseData = {
  success: boolean;
  message?: string;
  token?: string;
  user?: Omit<User, "passwordHash">;
};

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
      await AppDataSource.initialize();
    }

    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    // Buscar usuário pelo email
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Criar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "seu_segredo_jwt_temporario",
      { expiresIn: "7d" }
    );

    // Omitir senha do retorno
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      token,
      user: userWithoutPassword as Omit<User, "passwordHash">,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
