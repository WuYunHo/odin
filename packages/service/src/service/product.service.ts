import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Product } from '../entity/product';
import { Repository } from 'typeorm';

@Provide()
export class ProductService {
  @InjectEntityModel(Product)
  productModel: Repository<Product>;

  // save
  async saveProduct(name: string) {
    // create a entity object

    const product: Product = new Product();

    product.name = name;
    product.count = 99;
    product.time = new Date();

    // save entity
    const productResult = await this.productModel.save(product);

    // save success
    console.log('product id = ', productResult.id);

    return productResult;
  }

  // load
  async loadProducts() {
    const products = await this.productModel.find();

    return products;
  }
}
