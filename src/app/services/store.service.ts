import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  private shoppingCart: Product[] = [];
  private products: Product[] = [];
  private total: number = 0;
  private personalCart = new BehaviorSubject<Product[]>([]);

  personalCart$ = this.personalCart.asObservable();

  setProducts(products: Product[]) {
    this.products = products;
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  getTotal() {
    return this.total;
  }

  addOnShoppingCart(product: Product) {
    if (product.quantityLeft > 0) {
      const index = this.products.indexOf(product);
      this.shoppingCart.push(product);
      this.products[index].quantityLeft--;
      this.total += product.price;
      this.personalCart.next(this.shoppingCart);
    }
  }

  removeFromShoppingCart(product: Product) {
    const index = this.shoppingCart.indexOf(product);
    if (index !== -1) {
      this.shoppingCart.splice(index, 1);
      this.products[index].quantityLeft++;
      this.total -= product.price;
      this.personalCart.next(this.shoppingCart);
    }
  }
}
