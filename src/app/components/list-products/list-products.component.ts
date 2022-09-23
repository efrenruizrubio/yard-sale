import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { HeaderService } from '@services/header.service';
import { StoreService } from '@services/store.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
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
            1 + Math.floor(Math.random() * (linksLength - 1))
          ];
        element['tag'] = randomTag.name;
      });
      this.products = data;
      this.storeService.setProducts(data);
    });
    this.headerService.activeLink$.subscribe((data) => {
      this.filteredProducts = this.products.filter((product) => {
        return product.tag === data;
      });
      console.log(this.filteredProducts.length);
      console.log(this.products.length);
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
