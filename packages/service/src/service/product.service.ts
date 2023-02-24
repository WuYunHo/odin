import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Product } from '../entity/product';
import { Repository } from 'typeorm';

@Provide()
export class ProductService {
  @InjectEntityModel(Product)
  productModel: Repository<Product>;

  // save
  async saveProduct(name: string, type: string, price: number, count: number) {
    const product: Product = new Product();

    product.name = name;
    product.type = type;
    product.price = price;
    product.count = count;
    product.time = new Date();

    // save entity
    const productResult = await this.productModel.save(product);

    return productResult;
  }

  // find
  async findAllProducts() {
    const allProducts = await this.productModel.find();

    return allProducts;
  }

  //find product by name
  async findProductByName(name: string) {
    const productByName = await this.productModel.findOne({
      where: { name: name },
    });

    return productByName;
  }

  //update product by count
  async update(
    id: number,
    name: string,
    type: string,
    price: number,
    count: number
  ) {
    const updateProduct = await this.productModel.findOne({
      where: { id: id },
    });
    updateProduct.name = name;
    updateProduct.type = type;
    updateProduct.price = price;
    updateProduct.count = count;
    updateProduct.time = new Date();

    await this.productModel.save(updateProduct);

    return updateProduct;
  }

  //delete product by name
  async delete(name: string) {
    const updateProduct = await this.productModel.findOne({
      where: { name: name },
    });
    const deleteProduct = await this.productModel.remove(updateProduct);

    return deleteProduct;
  }

  //分页获取数据
  async paging(num: number) {
    const pagingData = await this.productModel
      .createQueryBuilder('id')
      .take(num)
      .getMany();

    return pagingData;
  }
}
