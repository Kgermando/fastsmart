import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';


@Injectable({
    providedIn: 'root'
  })
  export class CartService {
  subscription: Subscription;
  constructor(private afs: AngularFirestore) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const Cart = this.afs.collection('shoppingCarts').doc(cartId).collection('items').snapshotChanges()
      .pipe(map(x => new ShoppingCart(x as any)
      ));
    return Cart;
  }
  
  async addTocart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    console.log('cleared cart');
    const cartId = await this.getOrCreateCartId();
    this.afs.collection('shoppingCarts').doc(cartId).collection('items').snapshotChanges().pipe(take(1))
    .subscribe(products => {  products.map(productItem =>
      this.afs.collection('shoppingCarts').doc(cartId).collection('items').doc(productItem.payload.doc.id).delete()
      );
    });
  }
  
  private create() {
    return this.afs.collection('shoppingCarts').add({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId (): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.id);
      return result.id;

    } return cartId;
  }
  
  
  private getItem(cartId: string, productId: string): Observable<any>  {
    return this.afs.collection('shoppingCarts').doc(cartId).collection('items').doc(productId).valueChanges();
  }


  private updateItem(cartId: string, productId: string) {
    return this.afs.collection('shoppingCarts').doc(cartId).collection('items').doc(productId);
  }
  
  
  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);
  
  item$.pipe(take(1)).subscribe(item => {
      if (item  != null) {
        const quantity = item.quantity + change;
        // const quantity = change;
        if (quantity === 0) {this.updateItem(cartId, product.id).delete(); } else {
          this.updateItem(cartId, product.id).update({ quantity: quantity }); }
    } else {
      this.updateItem(cartId, product.id).set({ product: product, quantity: 1 });
      }
    });
  }
  
}
