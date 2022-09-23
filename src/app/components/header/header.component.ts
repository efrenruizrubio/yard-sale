import { Component, HostListener, OnInit } from '@angular/core';
import { LinkHeader } from '@models/linkHeader.model';
import { HeaderService } from '@services/header.service';
import { StoreService } from '@services/store.service';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  screenWidth: number = window.innerWidth;
  isMenuOpen: boolean = this.headerService.getMenuState();
  isCartListOpen: boolean = this.headerService.getCartState();
  isRemoveMenuOpen: boolean = this.headerService.getRemoveState();
  links: LinkHeader[] = this.headerService.getLinks();
  index: number = this.headerService.getIndex();
  shoppingCart: Product[] = [];
  counter: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event);
    this.screenWidth = window.innerWidth;
  }
  constructor(
    private headerService: HeaderService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeService.personalCart$.subscribe((products) => {
      this.shoppingCart = products;
      this.counter = this.shoppingCart.length;
    });
  }

  toggleMenu() {
    this.headerService.toggleMenu();
    this.isMenuOpen = this.headerService.getMenuState();
  }

  toggleCartList() {
    this.headerService.toggleCartList();
    this.isCartListOpen = this.headerService.getCartState();
  }

  changeActiveLink(i: number) {
    this.headerService.changeActiveLink(i);
    this.links = this.headerService.getLinks();
    this.toggleMenu();
  }

  toggleRemoveMenu() {
    this.headerService.toggleRemoveMenu();
    this.isRemoveMenuOpen = this.headerService.getRemoveState();
    console.log(this.isRemoveMenuOpen);
  }

  setIndex(index: number) {
    this.headerService.setIndex(index);
    this.index = this.headerService.getIndex();
  }

  onRemoveFromShoppingCart() {
    const product = this.shoppingCart[this.index];
    this.storeService.removeFromShoppingCart(product);
    this.toggleRemoveMenu();
  }
}
