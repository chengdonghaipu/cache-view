import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedCacheSnapshot} from "./cache-view-strategy.service";

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      tab1 works!
    </p>
  `,
  styles: [
  ]
})
export class Tab1Component implements OnInit {

  constructor(private readonly snapshot: ActivatedCacheSnapshot) {
    console.log(this.snapshot);
  }
  ngOnInit() {
    console.log('ngOnInit tab1')
  }
}
