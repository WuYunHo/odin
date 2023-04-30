import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product_type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
  })
  type_content: string;
}


@Entity()
export class Product_region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 200,
  })
  region_content: string;
}
