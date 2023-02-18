// entity/photo.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
  })
  name: string;

  @Column({
    length: 100,
  })
  type: string;

  @Column({
    type: 'double',
  })
  price: number;

  @Column()
  count: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  time: Date;
}
