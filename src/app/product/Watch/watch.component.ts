import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
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
export class WatchComponent implements OnInit  {
  selectBlack = true;

  ngOnInit(): void {
  }

  changeColor(event) {
    this.selectBlack = event.target.value !== 'white';
  }

}
