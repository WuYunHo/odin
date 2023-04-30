import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
  })
  account: string;
  
  @Column({
    length: 200,
  })
  password: string;

  @Column({
    length: 200,
  })
  name: string;

  @Column({
    length: 200,
  })
  cardmsg: string;

  @Column({
    length: 200,
  })
  birth: string;

  @Column({
    length: 200,
  })
  major: string;

  @Column()
  type: number;

  @Column({
    length: 200,
    default: null,
  })
  tel: string;

  @Column({
    type: 'text',
    default: null,
  })
  addr: string;

  @Column({
    default: null,
  })
  voltime: number;

  @Column({
    default: null,
  })
  cash: number;
}
