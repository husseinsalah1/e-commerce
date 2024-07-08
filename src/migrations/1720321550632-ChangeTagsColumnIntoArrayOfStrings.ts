import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTagsColumnIntoArrayOfStrings1720321550632 implements MigrationInterface {
    name = 'ChangeTagsColumnIntoArrayOfStrings1720321550632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" ntext`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" nvarchar(255) NOT NULL`);
    }

}
