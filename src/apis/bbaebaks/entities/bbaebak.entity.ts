import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mate } from './mate.entity';

@Entity()
export class Bbaebak extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 8, nullable: true })
  maker: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({
    type: 'enum',
    enum: ['draft', 'signed', 'completed'],
    default: 'draft',
  })
  status: string;

  @OneToMany(() => Mate, (mate) => mate.bbaebak, {
    cascade: true,
  })
  mates: Mate[];
}
