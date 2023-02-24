import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  articleID: number;

  @Column()
  state: number;

  @Column({
    type: 'text'
  })
  context: string;

  @Column()
  userID: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  pubtime: Date;

  @Column({
    length: 200,
  })
  title: string;

  @Column()
  collect: number;
  
  @Column()
  looks: number;

  @Column()
  light: number;
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comID: number;

  @Column()
  articleID: number;

  @Column({
    type: 'text'
  })
  context: string;

  @Column()
  userID: number;

  @Column()
  tarcomID: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  pubtime: Date;
}
