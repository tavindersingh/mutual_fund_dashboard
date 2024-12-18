import { Fund } from 'src/funds/entities/fund.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fund_history')
export class FundHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 4 })
  netAssetValue: number;

  @Column()
  date: string;

  @Column()
  fundSchemeCode: string;

  @ManyToOne(() => Fund, { onDelete: 'CASCADE' })
  fund: Fund;
}
