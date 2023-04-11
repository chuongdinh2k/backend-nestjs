import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    const { name, categoryId, description, product_image } = createProductDto;
    const product = await this.findOne({ where: { name: name } });
    if (product) {
      throw new HttpException('Product is exists!', HttpStatus.BAD_REQUEST);
    }

    const newProduct = this.productRepo.create({
      name,
      categoryId,
      description,
      product_image,
    });

    const savedProduct = await this.productRepo.save(newProduct);
    return savedProduct;
  }

  async findOne(options?: object) {
    const product = await this.productRepo.findOne(options);
    return product;
  }

  async update(
    _id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    let product = await this.findOne({ where: { id: _id } });
    if (!product) {
      throw new HttpException(
        `Product with ID: ${_id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    product = {
      ...product,
      ...updateProductDto,
    };
    const productSaved = await this.productRepo.save(product);
    return productSaved;
  }

  async findByName(name: string): Promise<ProductEntity[]> {
    console.log('name', name);
    return this.productRepo
      .createQueryBuilder('product')
      .where('product.name LIKE :name', { name: `%{name}` })
      .getMany();
  }
}
