import { Injectable } from '@angular/core';
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
  private index: number = -1;

  private MenuOpen = new BehaviorSubject<boolean>(false);
  private CartListOpen = new BehaviorSubject<boolean>(false);
  private activeLink = new BehaviorSubject<string>('All');

  private isRemoveMenuOpen: boolean = false;
  private links: LinkHeader[] = [];

  MenuOpen$ = this.MenuOpen.asObservable();
  CartListOpen$ = this.CartListOpen.asObservable();
  activeLink$ = this.activeLink.asObservable();

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
    this.MenuOpen.next(this.isMenuOpen);
  }

  toggleCartList() {
    this.isCartListOpen = !this.isCartListOpen;
    this.CartListOpen.next(this.isCartListOpen);
  }

  toggleRemoveMenu() {
    this.isRemoveMenuOpen = !this.isRemoveMenuOpen;
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

  getIndex() {
    return this.index;
  }

  setIndex(index: number) {
    this.index = index;
  }

  changeActiveLink(i: number) {
    this.links.forEach((link) => {
      link.active = false;
    });
    this.links[i].active = true;
    this.activeLink.next(this.links[i].name);
  }

  removeFromShoppingCart(product: Product) {
    this.storeService.removeFromShoppingCart(product);
  }
}
