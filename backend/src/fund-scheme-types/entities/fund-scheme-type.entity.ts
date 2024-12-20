import { Fund } from 'src/funds/entities/fund.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fund_scheme_types')
export class FundSchemeType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  name: string;

  @OneToMany(() => Fund, (fund) => fund.fundSchemeType)
  funds: Fund[];
}
