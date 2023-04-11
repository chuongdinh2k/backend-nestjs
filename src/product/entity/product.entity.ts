import { ProductCategoryEntity } from 'src/product-category/entity/product-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProductCategoryEntity, (categoryItem) => categoryItem.id)
  @JoinColumn({ name: 'category_id' })
  categoryId: string;

  @Column()
  description: string;

  @Column()
  product_image: string;
}
