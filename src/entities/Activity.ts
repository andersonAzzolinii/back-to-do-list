import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ulid } from 'ulid';
import { User } from './User';

@Entity()
export class Activity {
  @PrimaryColumn('char', { length: 26 })
  id!: string;

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @CreateDateColumn()
  create_date!: Date;

  @CreateDateColumn({ nullable: true })
  update_date!: Date;

  @Column({ nullable: true, default: null })
  done_date!: Date | null;

  @Column({ nullable: true, default: null })
  exclusion_date!: Date | null;

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user!: User;

}
