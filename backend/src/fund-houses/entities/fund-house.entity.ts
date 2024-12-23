import { Fund } from 'src/funds/entities/fund.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fund_houses')
export class FundHouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  name: string;

  @OneToMany(() => Fund, (fund) => fund.fundHouse)
  funds: Fund[];
}
