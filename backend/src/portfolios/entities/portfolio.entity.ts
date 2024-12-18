import { Fund } from 'src/funds/entities/fund.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  schemeCode: string;

  @Column('float')
  units: number;

  @Column('float')
  purchasePrice: number;

  @Column('date')
  purchaseDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'schemeCode' })
  fund: Fund;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
