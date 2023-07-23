import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  path = 'tab1';
  constructor() {
    // setTimeout(() => this.path='tab1', 100)
  }
}
