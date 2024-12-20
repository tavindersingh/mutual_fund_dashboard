import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUniqueConstraintInFundHistoryTable1734688229973
  implements MigrationInterface
{
  name = 'AddedUniqueConstraintInFundHistoryTable1734688229973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_07d4f724225bd8d447a47f1c51" ON "fund_history" ("date", "fundSchemeCode") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_07d4f724225bd8d447a47f1c51"`);
  }
}
