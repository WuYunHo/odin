import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Cart, Orderprdt, Orders, Product } from '../entity/product';
import { Repository } from 'typeorm';

@Provide()
export class ProductService {
  @InjectEntityModel(Product)
  productModel: Repository<Product>;

  @InjectEntityModel(Orders)
  ordersModel: Repository<Orders>

  @InjectEntityModel(Cart)
  cartModel: Repository<Cart>

  @InjectEntityModel(Orderprdt)
  orderprdtModel: Repository<Orderprdt>

  // save
  async saveProduct(name: string, type: string, price: number, count: number, sellerID: number, sellerName: string,descriptions: string,region: string, imgUrl: string) {
    const product: Product = new Product();

    product.name = name;
    product.type = type;
    product.price = price;
    product.count = count;
    product.sellerID = sellerID;
    product.sellerName = sellerName;
    product.descriptions = descriptions;
    product.region = region;
    product.imgUrl = imgUrl;
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

  async findProductByRegion(region: string) {
    const productByRegion = await this.productModel.find({
      where: { region: region },
    });

    return productByRegion;
  }

  //update product by count
  async update(
    id: number,
    name: string,
    type: string,
    price: number,
    count: number,
    descriptions: string,
  ) {
    const updateProduct = await this.productModel.findOne({
      where: { id: id },
    });
    updateProduct.name = name;
    updateProduct.type = type;
    updateProduct.price = price;
    updateProduct.count = count;
    updateProduct.descriptions = descriptions;
    updateProduct.time = new Date();

    await this.productModel.save(updateProduct);

    console.log(updateProduct)

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

  //学生创建订单
  async saveOrder(sellerID: number, buyerID: number, buyertel: string, buyeraddr: string, context: string, price: number) {
    const order: Orders = new Orders();
  
    order.state = 0;
    order.sellerID = sellerID;
    order.buyerID = buyerID;
    order.buyertel = buyertel;
    order.buyeraddr = buyeraddr;
    // order.volID = volID;
    order.context = context;
    order.price = price;
    order.time = new Date();
  
    // save entity
    const orderResult = await this.ordersModel.save(order);
  
    return orderResult;
  }

  //用户删除订单
  async removeOrder(id: number){
    const remove = await this.orderprdtModel.find({
      where:{
        id: id,
      }
    })

    await this.orderprdtModel.remove(remove)
  }

  //志愿者查询所有订单
  async findOrder() {
    const order = await this.ordersModel.find({
      where: { state: 0 },
    });

    return order;
  }

  //商家查询订单
  async findsellerOrder(sellerID: number) {
    const order = await this.ordersModel.find({
      where: { sellerID: sellerID },
    });

    return order;
  }

  //志愿者查询订单
  async findvolOrder(volID: number) {
    const order = await this.ordersModel.find({
      where: { volID: volID },
    });

    return order;
  }

  //用户查询订单
  async finduserOrder(buyerID: number) {
    const order = await this.ordersModel.find({
      where: { buyerID: buyerID },
    });

    return order;
  }

  //志愿者接单
  async takeOrder(id: number, volID: number, volname: string, voltel: string) {
    const order = await this.ordersModel.findOne({
      where: { id: id },
    });

    order.state = 1;
    order.volID = volID;
    order.volname = volname;
    order.voltel = voltel

    const orderResult = await this.ordersModel.save(order);

    return orderResult;
  }
  
  //学生完单
  async finishOrder(id: number) {
    const order = await this.ordersModel.findOne({
      where: { id: id },
    });

    order.state = 2;

    const orderResult = await this.ordersModel.save(order);

    return orderResult; 
  }

  async changeProductCount(id: number, number: number) {
    const product = await this.productModel.findOne({
      where: { id: id },
    });

    product.count =  product.count - number;

    const changeProduct = await this.productModel.save(product)

    return changeProduct
  }

  async backProductCount(id: number, number: number) {
    const product = await this.productModel.findOne({
      where: { id: id },
    });

    product.count =  product.count + number;

    const changeProduct = await this.productModel.save(product)

    return changeProduct
  }

  async addCart(prdtID: number, userID: number, count: number) {
    let findcart = await this.cartModel.findOne({
      where: {
        prdtID: prdtID,
        userID: userID,
      }
    })

    console.log(findcart)
    if(findcart == null){
      const addtemp = new Cart();
      addtemp.prdtID = prdtID;
      addtemp.userID = userID;
      addtemp.count = count;

      await this.cartModel.save(addtemp)
    }else{
      findcart.count = findcart.count + 1
      await this.cartModel.save(findcart)
    }
  }

  async cutCart(prdtID: number, userID: number) {
    const cutTemp = await this.cartModel.findOne({
      where:{
        prdtID: prdtID,
        userID: userID
      }
    })

    if(cutTemp.count > 1){
      cutTemp.count = cutTemp.count - 1
      await this.cartModel.save(cutTemp)
    }else{
      await this.cartModel.remove(cutTemp)
    }
  }

  async findCart(userID: number) {
    const cartList = await this.cartModel.find({
      where: {
        userID: userID,
      }
    })

    return cartList
  }

  async findCartByid(prdtID: number) {
    const cart = await this.cartModel.find({
      where: {
        prdtID: prdtID,
      }
    })

    return cart
  }

  async addOrderPrdt(orderid: number, prdtid: number, count: number){
    const orderprdt = new Orderprdt();
    orderprdt.orderID = orderid
    orderprdt.prdtID = prdtid
    orderprdt.count = count

    await this.orderprdtModel.save(orderprdt)
  }

  async cutOrderPrdt(orderid: number){
    const orderprdt = await this.orderprdtModel.find({
      where:{
        orderID: orderid,
      }
    })

    await this.orderprdtModel.remove(orderprdt)
  }

  async findOrderPrdt(orderid: number){
    const orderprdt = await this.orderprdtModel.find({
      where:{
        orderID: orderid,
      }
    })

    let arr = []
    const allprdt = await this.productModel.find({})
    for(let item of allprdt){
      for(let orderitem of orderprdt){
        if(item.id == orderitem.prdtID){
          arr.push(item)
        }
      }
    }
    console.log(arr)

    return arr
  }

  
}




