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
  username: string;

  @Column({
    type: 'tinyint',
  })
  isbuyed: number;

  @Column({
    length: 200,
  })
  password: string;

  @Column()
  type: number;
}
