import {Directive, ElementRef, Host, HostListener, inject, Injector, Input, OnInit, Renderer2} from '@angular/core';
import {CacheViewComponent, PARENT} from "./cache-view.component";
import {filter} from "rxjs";

@Directive({
  selector: '[appViewLink]'
})
export class ViewLinkDirective implements OnInit {
  #parent = inject(PARENT) || {}
  @Input('appViewLink') path!: string;

  @Input() view!: CacheViewComponent;

  @Input() linkActive?: string;

  private get _view() {
    return this.view || this.#parent.view
  }

  @HostListener('click', ['$event'])
  linkHandler(/*event: MouseEvent*/) {
    this._view.activateByPath(this.path);
  }

  constructor(private readonly injector: Injector,
              private readonly renderer: Renderer2,
              private readonly elRef: ElementRef) {
  }

  ngOnInit() {
    this._view.activePath
      // .pipe(filter(path => !!this.linkActive && path === this.linkActive))
      .subscribe((path) => {
        if (!!this.linkActive && path === this.path) {
          this.renderer.addClass(this.elRef.nativeElement, this.linkActive!);
        } else if (this.linkActive) {
          this.renderer.removeClass(this.elRef.nativeElement, this.linkActive);
        }
      })
  }
}
