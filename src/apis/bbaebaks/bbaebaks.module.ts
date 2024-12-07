import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationsModule } from '../verification/verification.module';
import { BbaebaksController } from './bbaebaks.controller';
import { BbaebaksService } from './bbaebaks.service';
import { Bbaebak } from './entities/bbaebak.entity';
import { Mate } from './entities/mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bbaebak, Mate]), VerificationsModule],
  controllers: [BbaebaksController],
  providers: [BbaebaksService],
  exports: [BbaebaksService],
})
export class BbaebaksModule {}
