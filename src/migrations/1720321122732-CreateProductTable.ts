import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1720321122732 implements MigrationInterface {
    name = 'CreateProductTable1720321122732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "price" int NOT NULL, "tags" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_63fcb3d8806a6efd53dbc674309" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_51287e43b0bd3e113a1ead339c1" DEFAULT getdate(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
