import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class EditPackage {
  @PrimaryGeneratedColumn('uuid', {
    name: 'edit_id',
  })
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column('json', {
    nullable: false,
  })
  content: object;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @ManyToOne(() => User, (user) => user.editPackages)
  user: User;
}
