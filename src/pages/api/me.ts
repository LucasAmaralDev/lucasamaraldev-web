import type { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../ormconfig";
import { User } from "../../database/entities/User";
import * as jwt from "jsonwebtoken";

type ResponseData = {
  success: boolean;
  message?: string;
  user?: Omit<User, "passwordHash">;
};

interface JwtPayload {
  userId: number;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Verificar se é uma requisição GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Token não fornecido" });
    }

    const token = authHeader.substring(7); // Remover 'Bearer ' do início

    // Verificar e decodificar o token
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || "seu_segredo_jwt_temporario"
      ) as JwtPayload;
    } catch {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou expirado" });
    }

    // Inicializar conexão com o banco de dados
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Buscar usuário pelo ID
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decodedToken.userId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    // Omitir senha do retorno
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      user: userWithoutPassword as Omit<User, "passwordHash">,
    });
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
