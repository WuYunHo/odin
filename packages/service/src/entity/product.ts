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

  @Column()
  sellerID: number;

  @Column({
    length: 200
  })
  sellerName: string

  @Column({
    type: 'text'
  })
  descriptions: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  time: Date;

  @Column({
    length: 200,
  })
  region: string;

  @Column({
    type: 'text'
  })
  imgUrl: string;
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: number;
  // state = 0 已创建/未接单 ；1 已接单； 2 已完成 

  @Column()
  sellerID: number;

  @Column()
  buyerID: number;
  
  @Column({
    length: 200,
  })
  buyertel: string;

  @Column({
    length: 200,
  })
  buyeraddr: string;

  @Column({
    default: null,
  })
  volID: number;

  @Column({
    default: null,
  })
  voltel: string;

  @Column({
    default: null,
  })
  volname: string;

  @Column({
    type: 'text',
  })
  context: string;

  @Column()
  price: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  time: Date;
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prdtID: number;

  @Column()
  userID: number;

  @Column({
    default: 1
  })
  count: number;
}

@Entity()
export class Orderprdt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderID: number;

  @Column()
  prdtID: number;

  @Column()
  count: number;
}
