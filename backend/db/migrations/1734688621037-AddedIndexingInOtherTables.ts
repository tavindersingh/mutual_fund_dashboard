import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedIndexingInOtherTables1734688621037
  implements MigrationInterface
{
  name = 'AddedIndexingInOtherTables1734688621037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_fund_houses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_fund_houses"("id", "name") SELECT "id", "name" FROM "fund_houses"`,
    );
    await queryRunner.query(`DROP TABLE "fund_houses"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_fund_houses" RENAME TO "fund_houses"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_fund_houses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_aa45436741b6b76596dc4659a24" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_fund_houses"("id", "name") SELECT "id", "name" FROM "fund_houses"`,
    );
    await queryRunner.query(`DROP TABLE "fund_houses"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_fund_houses" RENAME TO "fund_houses"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_614a8acbb52d21693ec78cd5cd" ON "fund_houses" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b79ec7c467f9b1e8c0597e9ff" ON "fund_scheme_types" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd82061b64fbadb742965395fc" ON "funds" ("schemeCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_893be8736f511b9b21e8566573" ON "funds" ("schemeName") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_893be8736f511b9b21e8566573"`);
    await queryRunner.query(`DROP INDEX "IDX_fd82061b64fbadb742965395fc"`);
    await queryRunner.query(`DROP INDEX "IDX_1b79ec7c467f9b1e8c0597e9ff"`);
    await queryRunner.query(`DROP INDEX "IDX_614a8acbb52d21693ec78cd5cd"`);
    await queryRunner.query(
      `ALTER TABLE "fund_houses" RENAME TO "temporary_fund_houses"`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_houses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "fund_houses"("id", "name") SELECT "id", "name" FROM "temporary_fund_houses"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_fund_houses"`);
    await queryRunner.query(
      `ALTER TABLE "fund_houses" RENAME TO "temporary_fund_houses"`,
    );
    await queryRunner.query(
      `CREATE TABLE "fund_houses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "fund_houses"("id", "name") SELECT "id", "name" FROM "temporary_fund_houses"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_fund_houses"`);
  }
}
