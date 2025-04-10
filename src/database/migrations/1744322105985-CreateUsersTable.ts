import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1744322105985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop tabela se existir
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);

    // Criar a tabela do zero com todas as colunas necessárias
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "username" character varying NOT NULL,
                "nome" character varying NOT NULL,
                "sobrenome" character varying NOT NULL,
                "passwordHash" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
            )
        `);

    // Criar um usuário admin de teste (senha: admin123)
    await queryRunner.query(`
            INSERT INTO "users" 
            ("email", "username", "nome", "sobrenome", "passwordHash", "createdAt", "updatedAt")
            VALUES ('admin@exemplo.com', 'admin', 'Admin', 'Sistema', '$2a$10$giwmoioHUiMAOr/Yn4UN..CqSgUYCC9bD5pnPOkGMWbTlYO/LGj/6', DEFAULT, DEFAULT)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
  }
}
