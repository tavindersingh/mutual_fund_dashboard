import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedFieldFromFundHistoryTable1734466809956 implements MigrationInterface {
    name = 'RemovedFieldFromFundHistoryTable1734466809956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar, CONSTRAINT "FK_6c92bcaa0dd90fe46717704116a" FOREIGN KEY ("fundSchemeCode") REFERENCES "funds" ("schemeCode") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "fund_history"`);
        await queryRunner.query(`DROP TABLE "fund_history"`);
        await queryRunner.query(`ALTER TABLE "temporary_fund_history" RENAME TO "fund_history"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_history" RENAME TO "temporary_fund_history"`);
        await queryRunner.query(`CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundId" integer NOT NULL, "fundSchemeCode" varchar, CONSTRAINT "FK_6c92bcaa0dd90fe46717704116a" FOREIGN KEY ("fundSchemeCode") REFERENCES "funds" ("schemeCode") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "temporary_fund_history"`);
        await queryRunner.query(`DROP TABLE "temporary_fund_history"`);
    }

}
