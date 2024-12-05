import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../common/enum/role.enum';
import { EditPage } from './edit-page.entity';
import { EditPackage } from './edit-package.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  phone: string;

  @Column({
    length: 30,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: '/user.png',
  })
  imgUrl: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_status: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @OneToMany(() => EditPage, (edit) => edit.id)
  editPages: EditPage[];

  @OneToMany(() => EditPackage, (edit) => edit.id)
  editPackages: EditPackage[];

  @BeforeInsert()
  setDefaultUsername() {
    this.username = this.phone;
  }
}
