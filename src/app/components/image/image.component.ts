import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  src: string = '';
  @Input() set setSrc(img: string) {
    this.src = img;
  }

  @Input() alt: string = '';

  constructor() {}

  ngOnInit(): void {}

  imgError() {
    this.src = '/assets/images/default.png';
  }
}
