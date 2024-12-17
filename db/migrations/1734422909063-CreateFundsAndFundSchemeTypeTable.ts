import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundsAndFundSchemeTypeTable1734422909063
  implements MigrationInterface
{
  name = 'CreateFundsAndFundSchemeTypeTable1734422909063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fund_scheme_types" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_1b79ec7c467f9b1e8c0597e9fff" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId" FROM "funds"`,
    );
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`ALTER TABLE "temporary_funds" RENAME TO "funds"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "funds" RENAME TO "temporary_funds"`);
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId" FROM "temporary_funds"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_funds"`);
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`DROP TABLE "fund_scheme_types"`);
  }
}
