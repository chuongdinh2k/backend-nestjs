import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItemEnity } from './entity/product-item.entity';
import { ProductItemService } from './product_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductItemEnity])],
  providers: [ProductItemService],
})
export class ProductItemModule {}
