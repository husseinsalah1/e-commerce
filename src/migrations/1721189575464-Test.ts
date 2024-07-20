import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1721189575464 implements MigrationInterface {
    name = 'Test1721189575464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_89502c44bd22c06e714c31c1e9" ON "users" ("cartId") WHERE "cartId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`DROP INDEX "REL_89502c44bd22c06e714c31c1e9" ON "users"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
    }

}
