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

  @Column()
  username: string;

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

  @Column({
    type: 'text'
  })
  imgURL: string;
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
  userName: string;

  @Column()
  tarcomID: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  pubtime: Date;
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  actvid: number;

  @Column({
    type: 'text',
  })
  actvname: string;

  @Column({
    type: 'text'
  })
  actvaddr: string;

  @Column()
  actvtime: string;

  @Column()
  actvduration: number;

  @Column({
    type: 'text'
  })
  actvtext: string;

  @Column()
  leaderID: number;
  
  @Column()
  leadername: string;

  @Column()
  leadertel: string;

  @Column()
  needp: number;

  @Column({
    default: 0,
  })
  alreadyp: number;

  @Column()
  state: number;

  @Column({
    type: 'text'
  })
  imgURL: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  pubtime: Date;
}

@Entity()
export class Activitylist {
  @PrimaryGeneratedColumn()
  actvlistID: number;

  @Column()
  actvID: number;

  @Column()
  menberID: number;

  @Column()
  menbername: string;

  @Column()
  menbertel: string;

  @Column({
    default: 0
  })
  state: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  pubtime: Date;
}

@Entity()
export class Collect {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  userID: number;

  @Column()
  articleID: number;
}

@Entity()
export class Light {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  userID: number;

  @Column()
  articleID: number;
}