import { FundHouse } from 'src/fund-houses/entities/fund-house.entity';
import { FundSchemeType } from 'src/fund-scheme-types/entities/fund-scheme-type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('funds')
export class Fund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schemeCode: string;

  @Column()
  schemeName: string;

  @Column('decimal', { precision: 10, scale: 4 })
  netAssetValue: number;

  @Column()
  date: string;

  @Column()
  fundHouseId: number;

  @Column()
  fundSchemeTypeId: number;

  @ManyToOne(() => FundHouse, (fundHouse) => fundHouse.funds)
  fundHouse: FundHouse;

  @ManyToOne(() => FundSchemeType, (fundSchemeType) => fundSchemeType.funds)
  fundSchemeType: FundSchemeType;
}
