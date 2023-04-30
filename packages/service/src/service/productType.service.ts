import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Product_type, Product_region } from '../entity/product_type';

@Provide()
export class ProductTypeService {
  @InjectEntityModel(Product_type)
  productTypeModel: Repository<Product_type>;

  @InjectEntityModel(Product_region)
  productRegionModel: Repository<Product_region>;

  // find
  async findAllProductTypes() {
    const allProducts = await this.productTypeModel.find();

    return allProducts;
  }

  // create
  async createNewProductTypes(producttype: string) {
    const type: Product_type = new Product_type();

    type.type_content = producttype

    const result = await this.productTypeModel.save(type);

    return result;
  }

  // create
  async createNewProductRegions(content: string) {
    const type: Product_region = new Product_region();

    type.region_content = content

    const result = await this.productRegionModel.save(type);

    return result;
  }

  async findAllProductRegions() {
    const allRegion = await this.productRegionModel.find();

    return allRegion;
  }
}
