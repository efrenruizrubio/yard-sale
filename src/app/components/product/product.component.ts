import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() isProductAvailable: boolean = true;
  @Input() isProductRemovable: boolean = false;

  @Output() addProduct = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  addToShoppingCart() {
    this.addProduct.emit(this.product);
  }

  removeFromShoppingCart() {
    this.removeProduct.emit(this.product);
  }
}
