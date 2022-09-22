import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { LinkHeader } from '@models/linkHeader.model';
import { Product } from '@models/product.model';
import { StoreService } from '@services/store.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private isMenuOpen: boolean = false;
  private isCartListOpen: boolean = false;
  private isRemoveMenuOpen: boolean = false;
  private links: LinkHeader[] = [];
  private confirmRemove: boolean = false;

  isMenuOpen$ = new BehaviorSubject<boolean>(this.isMenuOpen);
  isCartListOpen$ = new BehaviorSubject<boolean>(this.isCartListOpen);

  constructor(private storeService: StoreService) {
    this.links = [
      {
        name: 'All',
        active: true,
      },
      {
        name: 'Clothes',
        active: false,
      },
      {
        name: 'Electronics',
        active: false,
      },
      {
        name: 'Furniture',
        active: false,
      },
      {
        name: 'Toys',
        active: false,
      },
      {
        name: 'Others',
        active: false,
      },
    ];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpen$.next(this.isMenuOpen);
  }

  toggleCartList() {
    this.isCartListOpen = !this.isCartListOpen;
    this.isCartListOpen$.next(this.isCartListOpen);
  }

  toggleRemoveMenu() {
    this.isRemoveMenuOpen = !this.isRemoveMenuOpen;
  }

  setConfirmRemove(value: boolean) {
    this.confirmRemove = value;
  }

  getConfirmRemove() {
    return this.confirmRemove;
  }

  getLinks() {
    return this.links;
  }

  getMenuState() {
    return this.isMenuOpen;
  }

  getCartState() {
    return this.isCartListOpen;
  }

  getRemoveState() {
    return this.isRemoveMenuOpen;
  }

  changeActiveLink(i: number) {
    this.links.forEach((link) => {
      link.active = false;
    });
    this.links[i].active = true;
  }

  removeFromShoppingCart(product: Product) {
    if (this.confirmRemove) {
      this.confirmRemove = false;
      this.storeService.removeFromShoppingCart(product);
    }
  }
}
