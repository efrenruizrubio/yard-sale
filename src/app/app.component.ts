import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAnyMenuOpen: boolean = false;

  constructor(private headerService: HeaderService) {
    this.headerService.isMenuOpen$.subscribe((value) => {
      value ? (this.isAnyMenuOpen = true) : (this.isAnyMenuOpen = false);
    });
    this.headerService.isCartListOpen$.subscribe((value) => {
      value ? (this.isAnyMenuOpen = true) : (this.isAnyMenuOpen = false);
    });
  }

  ngOnInit(): void {}
}
