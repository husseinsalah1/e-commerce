import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21721190424142 implements MigrationInterface {
    name = 'Test21721190424142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_756f53ab9466eb52a52619ee01" ON "cart" ("userId") WHERE "userId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`DROP INDEX "REL_756f53ab9466eb52a52619ee01" ON "cart"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
    }

}
