import {Directive, Host, HostListener, inject, Injector, Input, OnInit} from '@angular/core';
import {CacheViewComponent, PARENT} from "./cache-view.component";

@Directive({
  selector: '[appViewLink]'
})
export class ViewLinkDirective implements OnInit {
  #parent = inject(PARENT) || {}
  @Input('appViewLink') path!: string;

  @Input() view!: CacheViewComponent;

  private get _view() {
    return this.view || this.#parent.view
  }
  @HostListener('click', ['$event'])
  linkHandler(/*event: MouseEvent*/) {
    this._view.activateByPath(this.path);
  }

  constructor(private readonly injector: Injector,) {
    console.log(injector);
  }

  ngOnInit() {
    console.log(this.path);
  }
}
