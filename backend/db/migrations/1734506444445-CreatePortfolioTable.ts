import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePortfolioTable1734506444445 implements MigrationInterface {
    name = 'CreatePortfolioTable1734506444445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar, CONSTRAINT "FK_6c92bcaa0dd90fe46717704116a" FOREIGN KEY ("fundSchemeCode") REFERENCES "funds" ("schemeCode") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "fund_history"`);
        await queryRunner.query(`DROP TABLE "fund_history"`);
        await queryRunner.query(`ALTER TABLE "temporary_fund_history" RENAME TO "fund_history"`);
        await queryRunner.query(`CREATE TABLE "portfolios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "schemeCode" varchar NOT NULL, "units" float NOT NULL, "purchasePrice" float NOT NULL, "purchaseDate" date NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "fund_history"`);
        await queryRunner.query(`DROP TABLE "fund_history"`);
        await queryRunner.query(`ALTER TABLE "temporary_fund_history" RENAME TO "fund_history"`);
        await queryRunner.query(`CREATE TABLE "temporary_fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "fund_history"`);
        await queryRunner.query(`DROP TABLE "fund_history"`);
        await queryRunner.query(`ALTER TABLE "temporary_fund_history" RENAME TO "fund_history"`);
        await queryRunner.query(`CREATE TABLE "temporary_portfolios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "schemeCode" varchar NOT NULL, "units" float NOT NULL, "purchasePrice" float NOT NULL, "purchaseDate" date NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_5e434ba72b17fe8739090934b4b" FOREIGN KEY ("schemeCode") REFERENCES "funds" ("schemeCode") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e4e66691a2634fcf5525e33ecf5" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_portfolios"("id", "userId", "schemeCode", "units", "purchasePrice", "purchaseDate", "createdAt", "updatedAt") SELECT "id", "userId", "schemeCode", "units", "purchasePrice", "purchaseDate", "createdAt", "updatedAt" FROM "portfolios"`);
        await queryRunner.query(`DROP TABLE "portfolios"`);
        await queryRunner.query(`ALTER TABLE "temporary_portfolios" RENAME TO "portfolios"`);
        await queryRunner.query(`CREATE TABLE "temporary_fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar NOT NULL, CONSTRAINT "FK_6c92bcaa0dd90fe46717704116a" FOREIGN KEY ("fundSchemeCode") REFERENCES "funds" ("schemeCode") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "fund_history"`);
        await queryRunner.query(`DROP TABLE "fund_history"`);
        await queryRunner.query(`ALTER TABLE "temporary_fund_history" RENAME TO "fund_history"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_history" RENAME TO "temporary_fund_history"`);
        await queryRunner.query(`CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "temporary_fund_history"`);
        await queryRunner.query(`DROP TABLE "temporary_fund_history"`);
        await queryRunner.query(`ALTER TABLE "portfolios" RENAME TO "temporary_portfolios"`);
        await queryRunner.query(`CREATE TABLE "portfolios" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "schemeCode" varchar NOT NULL, "units" float NOT NULL, "purchasePrice" float NOT NULL, "purchaseDate" date NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "portfolios"("id", "userId", "schemeCode", "units", "purchasePrice", "purchaseDate", "createdAt", "updatedAt") SELECT "id", "userId", "schemeCode", "units", "purchasePrice", "purchaseDate", "createdAt", "updatedAt" FROM "temporary_portfolios"`);
        await queryRunner.query(`DROP TABLE "temporary_portfolios"`);
        await queryRunner.query(`ALTER TABLE "fund_history" RENAME TO "temporary_fund_history"`);
        await queryRunner.query(`CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar)`);
        await queryRunner.query(`INSERT INTO "fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "temporary_fund_history"`);
        await queryRunner.query(`DROP TABLE "temporary_fund_history"`);
        await queryRunner.query(`ALTER TABLE "fund_history" RENAME TO "temporary_fund_history"`);
        await queryRunner.query(`CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar, CONSTRAINT "FK_6c92bcaa0dd90fe46717704116a" FOREIGN KEY ("fundSchemeCode") REFERENCES "funds" ("schemeCode") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "temporary_fund_history"`);
        await queryRunner.query(`DROP TABLE "temporary_fund_history"`);
        await queryRunner.query(`DROP TABLE "portfolios"`);
        await queryRunner.query(`ALTER TABLE "fund_history" RENAME TO "temporary_fund_history"`);
        await queryRunner.query(`CREATE TABLE "fund_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "netAssetValue" decimal(10,4) NOT NULL, "date" varchar NOT NULL, "fundSchemeCode" varchar, CONSTRAINT "FK_6c92bcaa0dd90fe46717704116a" FOREIGN KEY ("fundSchemeCode") REFERENCES "funds" ("schemeCode") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "fund_history"("id", "netAssetValue", "date", "fundSchemeCode") SELECT "id", "netAssetValue", "date", "fundSchemeCode" FROM "temporary_fund_history"`);
        await queryRunner.query(`DROP TABLE "temporary_fund_history"`);
    }

}
