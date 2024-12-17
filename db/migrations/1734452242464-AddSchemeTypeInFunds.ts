import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSchemeTypeInFunds1734452242464 implements MigrationInterface {
  name = 'AddSchemeTypeInFunds1734452242464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer, "fundSchemeTypeId" integer NOT NULL, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId" FROM "funds"`,
    );
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`ALTER TABLE "temporary_funds" RENAME TO "funds"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer, "fundSchemeTypeId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId" FROM "funds"`,
    );
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`ALTER TABLE "temporary_funds" RENAME TO "funds"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer NOT NULL, "fundSchemeTypeId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId" FROM "funds"`,
    );
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`ALTER TABLE "temporary_funds" RENAME TO "funds"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer NOT NULL, "fundSchemeTypeId" integer NOT NULL, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1acd690a9740364d65c74c5344f" FOREIGN KEY ("fundSchemeTypeId") REFERENCES "fund_scheme_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId" FROM "funds"`,
    );
    await queryRunner.query(`DROP TABLE "funds"`);
    await queryRunner.query(`ALTER TABLE "temporary_funds" RENAME TO "funds"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "funds" RENAME TO "temporary_funds"`);
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer NOT NULL, "fundSchemeTypeId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId" FROM "temporary_funds"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_funds"`);
    await queryRunner.query(`ALTER TABLE "funds" RENAME TO "temporary_funds"`);
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer, "fundSchemeTypeId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId" FROM "temporary_funds"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_funds"`);
    await queryRunner.query(`ALTER TABLE "funds" RENAME TO "temporary_funds"`);
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer, "fundSchemeTypeId" integer NOT NULL, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId", "fundSchemeTypeId" FROM "temporary_funds"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_funds"`);
    await queryRunner.query(`ALTER TABLE "funds" RENAME TO "temporary_funds"`);
    await queryRunner.query(
      `CREATE TABLE "funds" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "schemeCode" varchar NOT NULL, "schemeName" varchar NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundHouseId" integer, CONSTRAINT "FK_3c5f2f711e16258fbf9d101eea4" FOREIGN KEY ("fundHouseId") REFERENCES "fund_houses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "funds"("id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId") SELECT "id", "schemeCode", "schemeName", "netAssetValue", "date", "fundHouseId" FROM "temporary_funds"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_funds"`);
  }
}
