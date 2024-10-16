import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class User {
  @PrimaryColumn('char', { length: 26 })
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }

}
