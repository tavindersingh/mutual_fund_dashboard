import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFundHousesTable1734388163016 implements MigrationInterface {
    name = 'CreateFundHousesTable1734388163016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fund_houses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fund_houses"`);
    }

}
