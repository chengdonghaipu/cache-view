import {Directive, Host, HostListener, Injector, Input, OnInit} from '@angular/core';
import {CacheViewComponent} from "./cache-view.component";

@Directive({
  selector: '[appViewLink]'
})
export class ViewLinkDirective implements OnInit {
  @Input('appViewLink') path!: string;

  @Input() view!: CacheViewComponent;

  private get _view() {
    return this.view
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
