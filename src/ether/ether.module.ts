import { Module } from '@nestjs/common';
import { EtherService } from './ether.service';
import { EtherController } from './ether.controller';

@Module({
  providers: [EtherService],
  controllers: [EtherController]
})
export class EtherModule {}
