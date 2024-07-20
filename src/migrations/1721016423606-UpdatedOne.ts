import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedOne1721016423606 implements MigrationInterface {
    name = 'UpdatedOne1721016423606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" int NOT NULL IDENTITY(1,1), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" int NOT NULL IDENTITY(1,1), "quantity" int NOT NULL CONSTRAINT "DF_d2ec632b9cce45d1d5dd30b2032" DEFAULT 0, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b85f9ac24bf779f1fcd93319270" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_8c6da413723d6723776da6735c4" DEFAULT getdate(), "cartId" int, "productId" int, CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "price" int NOT NULL, "tags" ntext, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_63fcb3d8806a6efd53dbc674309" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_51287e43b0bd3e113a1ead339c1" DEFAULT getdate(), "userId" int, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" int NOT NULL IDENTITY(1,1), "lineOne" nvarchar(255) NOT NULL, "lineTwo" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, "country" nvarchar(255) NOT NULL, "pinCode" nvarchar(255) NOT NULL, "userId" int NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b0ef5bbd388628e6df422d2953a" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_380edf9075c1ba3bedf571c8c52" DEFAULT getdate(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "firstName" nvarchar(255) NOT NULL, "lastName" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'USER', "defaultShippingAddress" int NOT NULL CONSTRAINT "DF_b23d3cd16056662fe7742c55a5f" DEFAULT 0, "defaultBillingAddress" int NOT NULL CONSTRAINT "DF_bc6dabc26d8173ccabb72698957" DEFAULT 0, "birthDate" datetime NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_edd714311619a5ad09525045838" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_edd714311619a5ad09525045838"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
