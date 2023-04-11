import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EtherService {
  private provider: ethers.JsonRpcProvider;

  //   constructor() {
  //     this.provider = new ethers.JsonRpcApiProvider(
  //       'https://data-seed-prebsc-1-s2.binance.org:8545',
  //     )
  //   }
  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      'https://data-seed-prebsc-2-s1.binance.org:8545',
    );
  }
  async getLogs(contractAddress: string): Promise<ethers.Log[]> {
    const filter = {
      address: contractAddress,
      fromBlock: 23656910,
      toBlock: 23656916 + 4000,
    };
    const logs = await this.provider.getLogs(filter);
    return logs;
  }
}
