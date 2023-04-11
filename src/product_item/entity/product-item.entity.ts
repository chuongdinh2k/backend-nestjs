import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_item')
export class ProductItemEnity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductItemEnity, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  productId: number;

  //   stock keeping unit
  @Column()
  SKU: string;

  @Column()
  qty_in_stock: number;

  @Column()
  product_image: string;

  @Column()
  size: number;

  @Column()
  color: string;
}
