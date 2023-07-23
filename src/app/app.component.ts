import { Component } from '@angular/core';
import {Tab1Component} from "./tab1.component";
import {Tab2Component} from "./tab2.component";
import {CONFIG} from "./cahce-view/token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: CONFIG, useValue: [
        {
          path: 'tab1',
          component: Tab1Component,
          data: {
            name: 'tab1'
          }
        },
        {
          path: 'tab2',
          component: Tab2Component,
          data: {
            name: 'tab2'
          }
        }
      ]
    }
  ]
})
export class AppComponent {
  path = 'tab1';
  constructor() {
    // setTimeout(() => this.path='tab1', 100)
  }
}
