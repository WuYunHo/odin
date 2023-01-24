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
    length: 100,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  time: Date;

  @Column()
  count: number;
}
