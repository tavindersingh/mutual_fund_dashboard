import { Fund } from 'src/funds/entities/fund.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fund_history')
@Index(['date', 'fundSchemeCode'], { unique: true })
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
