import { Injectable } from '@angular/core';
import { LinkHeader } from '@models/linkHeader.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private isMenuOpen: boolean = false;
  private isCartListOpen: boolean = false;
  private links: LinkHeader[] = [];

  isMenuOpen$ = new BehaviorSubject<boolean>(this.isMenuOpen);
  isCartListOpen$ = new BehaviorSubject<boolean>(this.isCartListOpen);

  constructor() {
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

  getLinks() {
    return this.links;
  }

  getMenuState() {
    return this.isMenuOpen;
  }

  getCartState() {
    return this.isCartListOpen;
  }

  changeActiveLink(i: number) {
    this.links.forEach((link) => {
      link.active = false;
    });
    this.links[i].active = true;
  }
}
