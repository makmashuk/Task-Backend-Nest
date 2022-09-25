import { Movie } from '../../movies/entities/movies.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: String,
  })
  name: string;
  @Column({
    type: String,
  })
  password: string;
  @Column()
  salt: string;
  @Column({
    type: String,
    unique: true,
  })
  email: string;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];

  @CreateDateColumn()
  created_at: Date;
  @CreateDateColumn()
  updated_at: Date;
}
