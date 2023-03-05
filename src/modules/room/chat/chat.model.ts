import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Room } from '../room.model';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  room: Room;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
