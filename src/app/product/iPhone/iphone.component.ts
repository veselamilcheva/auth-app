import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('1000ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class IphoneComponent implements OnInit  {
  valSlider = 0;

  frontLeftOffset = 0;
  frontOpacity = 1;
  backLeftOffset = 100;
  backOpacity = 0;

  ngOnInit(): void {
  }

  showIphoneFront() {
    let frame = 0;
    for (let i = this.valSlider; i >= 0; i--) {
      frame++;
      setTimeout(() => {
        this.updateValSlider(i);
      }, frame * 4);
    }
  }
  showIphoneBack() {
    let frame = 0;
    for (let i = this.valSlider; i <= 100; i++) {
      frame++;
      setTimeout(() => {
        this.updateValSlider(i);
      }, frame * 4);
    }
  }

  updateValSlider(val) {
    this.valSlider = val;

    this.frontOpacity = - val / 100 + 1;
    this.backOpacity = val / 100;

    this.frontLeftOffset = val;
    this.backLeftOffset = - val + 100;
  }
}
