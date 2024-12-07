import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BbaebaksModule } from './bbaebaks/bbaebaks.module';
import { VerificationsModule } from './verification/verification.module';

@Module({
  imports: [
    BbaebaksModule,

    VerificationsModule,
    RouterModule.register([
      {
        path: 'api/v1',
        module: BbaebaksModule,
      },
    ]),
  ],
})
export class ApiModule {}
