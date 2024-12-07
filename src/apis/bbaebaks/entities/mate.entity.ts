import { Bbaebak } from 'src/apis/bbaebaks/entities/bbaebak.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Mate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ default: false })
  isSigned: boolean;

  @Column({ type: 'text', nullable: true })
  signatureData: string;

  @CreateDateColumn()
  signedAt: Date;

  @ManyToOne(() => Bbaebak, (bbaebak) => bbaebak.mates)
  bbaebak: Bbaebak;
}
