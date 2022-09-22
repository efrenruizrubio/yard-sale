import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { HeaderService } from '@services/header.service';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  shoppingCart: Product[] = [];
  total: number = 0;
  constructor(
    private productsService: ProductsService,
    private headerService: HeaderService,
    private storeService: StoreService
  ) {
    this.shoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      data.forEach((element) => {
        element['quantityLeft'] = Math.round(Math.random() * 100 + 1);
        const linksLength = this.headerService.getLinks().length;
        const randomTag =
          this.headerService.getLinks()[
            Math.floor(Math.random() * linksLength)
          ];
        element['tag'] = randomTag.name;
      });
      this.products = data;
      this.storeService.setProducts(data);
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addOnShoppingCart(product);
    this.total = this.storeService.getTotal();
  }

  onRemoveFromShoppingCart(product: Product) {
    this.storeService.removeFromShoppingCart(product);
    this.total = this.storeService.getTotal();
  }
}
