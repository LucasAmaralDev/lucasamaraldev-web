// ormconfig.ts
import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./src/database/entities/User";
import path from "path";

const isProdEnv = process.env.NODE_ENV === "production";

// Sempre usar a entidade diretamente, em vez de globs
const entities = [User];

// Configurar SSL baseado nas variáveis de ambiente
const sslConfig =
  process.env.TYPEORM_SSL === "true"
    ? {
        ssl: {
          rejectUnauthorized:
            process.env.TYPEORM_SSL_REJECT_UNAUTHORIZED !== "false",
        },
      }
    : {};

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "postgres",
  synchronize: !isProdEnv, // Em produção, alterar para false e usar migrations
  logging: !isProdEnv,
  entities: entities,
  migrations: [path.join(__dirname, "/src/database/migrations/*.ts")],
  subscribers: [path.join(__dirname, "/src/database/subscribers/*.ts")],
  ssl:
    process.env.TYPEORM_SSL === "true"
      ? {
          rejectUnauthorized:
            process.env.TYPEORM_SSL_REJECT_UNAUTHORIZED !== "false",
        }
      : false,
  extra: {
    // Aumentar timeouts para conexões lentas
    connectionTimeoutMillis: 10000, // 10 segundos
    query_timeout: 30000, // 30 segundos
    statement_timeout: 30000, // 30 segundos
    ...sslConfig,
  },
});
