import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedCacheSnapshot} from "./cache-view-strategy.service";

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      tab2 works!
    </p>
  `,
  styles: [
  ]
})
export class Tab2Component implements OnInit {
  constructor(private readonly snapshot: ActivatedCacheSnapshot) {
    console.log(this.snapshot);
  }
  ngOnInit() {
    console.log('ngOnInit tab2')
  }
}
