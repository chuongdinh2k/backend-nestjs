import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductItemModule } from './product_item/product_item.module';
import { EtherModule } from './ether/ether.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    ProductModule,
    ProductCategoryModule,
    ProductItemModule,
    EtherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
