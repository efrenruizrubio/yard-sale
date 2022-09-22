import { Component, HostListener, OnInit, Output } from '@angular/core';
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
  confirmRemove: boolean = this.headerService.getConfirmRemove();
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
  }

  toggleRemoveMenu() {
    this.headerService.toggleRemoveMenu();
    this.isRemoveMenuOpen = this.headerService.getRemoveState();
    console.log(this.isRemoveMenuOpen);
  }

  onRemoveFromShoppingCart(product: Product) {
    if (this.confirmRemove) {
      this.storeService.removeFromShoppingCart(product);
    }
  }
}
