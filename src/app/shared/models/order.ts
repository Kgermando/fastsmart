import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          Title: i.product.Title,
          productImageUrl: i.product.productImageUrl,
          Prix: i.product.Prix
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}
