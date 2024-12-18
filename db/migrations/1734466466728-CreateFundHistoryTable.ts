import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundHistoryTable1734466466728 implements MigrationInterface {
  name = 'CreateFundHistoryTable1734466466728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "fundHouseId" integer NOT NULL, "fundSchemeTypeId" integer NOT NULL, CONSTRAINT "FK_1acd690a9740364d65c74c5344f" FOREIGN KEY ("fundSchemeTypeId") REFERENCES "fund_scheme_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_funds"("id", "schemeCode", "schemeName", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "fundHouseId", "fundSchemeTypeId" FROM "funds"`,
    );
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`ALTER TABLE "temporary_funds" RENAME TO "funds"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundId" integer NOT NULL, CONSTRAINT "FK_f361ad4afb5e7fb0003e90055cc" FOREIGN KEY ("fundId") REFERENCES "funds" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_fund_history"("id", "netAssetValue", "date", "fundId") SELECT "id", "netAssetValue", "date", "fundId" FROM "fund_history"`,
    );
    await queryRunner.query(`DROP TABLE "fund_history"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_fund_history" RENAME TO "fund_history"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fund_history" RENAME TO "temporary_fund_history"`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "fund_history"("id", "netAssetValue", "date", "fundId") SELECT "id", "netAssetValue", "date", "fundId" FROM "temporary_fund_history"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_fund_history"`);
    await queryRunner.query(`ALTER TABLE "funds" RENAME TO "temporary_funds"`);
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer NOT NULL, "fundSchemeTypeId" integer NOT NULL, CONSTRAINT "FK_1acd690a9740364d65c74c5344f" FOREIGN KEY ("fundSchemeTypeId") REFERENCES "fund_scheme_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "funds"("id", "schemeCode", "schemeName", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "fundHouseId", "fundSchemeTypeId" FROM "temporary_funds"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_funds"`);
    await queryRunner.query(`DROP TABLE "fund_history"`);
  }
}
