import { FundHouse } from 'src/fund-houses/entities/fund-house.entity';
import { FundSchemeType } from 'src/fund-scheme-types/entities/fund-scheme-type.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('funds')
export class Fund {
  @PrimaryColumn()
  schemeCode: string;

  @Column()
  schemeName: string;

  @Column()
  fundHouseId: number;

  @Column()
  fundSchemeTypeId: number;

  @ManyToOne(() => FundHouse, (fundHouse) => fundHouse.funds)
  fundHouse: FundHouse;

  @ManyToOne(() => FundSchemeType, (fundSchemeType) => fundSchemeType.funds)
  fundSchemeType: FundSchemeType;
}
