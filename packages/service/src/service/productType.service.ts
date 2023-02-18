import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Product_type } from '../entity/product_type';

@Provide()
export class ProductTypeService {
  @InjectEntityModel(Product_type)
  productTypeModel: Repository<Product_type>;

  // find
  async findAllProductTypes() {
    const allProducts = await this.productTypeModel.find();

    return allProducts;
  }
}
