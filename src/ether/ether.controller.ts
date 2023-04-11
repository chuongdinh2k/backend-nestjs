import { Controller, Get, Param } from '@nestjs/common';
import { EtherService } from './ether.service';
import { CONTRACT_ABI } from 'src/abi';

@Controller('ether')
export class EtherController {
  constructor(private readonly etherService: EtherService) {}
  @Get(':contractAddress')
  async getLogs(@Param('contractAddress') contractAddress: string) {
    console.log('CONTRACT_ABI', CONTRACT_ABI);
    try {
      const logs = await this.etherService.getLogs(contractAddress);
      return { success: true, logs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
