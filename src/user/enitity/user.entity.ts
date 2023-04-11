import { IsEmail, MaxLength } from 'class-validator';
import { Role } from 'src/auth/interface/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  @MaxLength(12)
  @Column()
  first_name: string;

  @MaxLength(12)
  @Column()
  last_name: string;

  @Column()
  role: 'admin' | 'user';

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
