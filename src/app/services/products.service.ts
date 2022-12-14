import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
    // return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
}
