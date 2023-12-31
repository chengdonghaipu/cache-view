import {
  Component, ComponentRef,
  inject, InjectionToken,
  Injector,
  Input,
  OnChanges,
  SimpleChange,
  ViewContainerRef
} from '@angular/core';
import {ActivatedCacheSnapshot, CacheViewStrategyService, DetachedCacheHandle} from "../cache-view-strategy.service";
import {CacheConfig, CONFIG} from "./token";
import {BehaviorSubject, Subject} from "rxjs";

type TypedSimpleChanges<T> = {
  [P in keyof T]?: SimpleChange;
};

export const PARENT = new InjectionToken<{view: CacheViewComponent}>('CACHE_VIEW_PARENT');

@Component({
  selector: 'app-cache-view',
  template: `
  `,
  styles: [],
})
export class CacheViewComponent implements OnChanges {
  private activated: ComponentRef<any> | null = null;
  public snapshot?: ActivatedCacheSnapshot;
  activePath = new BehaviorSubject<string>('');
  @Input() set defaultActivate(value: string) {
    this.activateByPath(value);
  }
  path = '';
  @Input() params: Record<string, string> = {};
  config: CacheConfig[] = inject(CONFIG, {optional: true}) ?? []

  #parent = inject(PARENT)

  activateByPath(path: string) {
    this.path = path;
    this.stateChange()
  }

  constructor(private readonly viewContainerRef: ViewContainerRef,
              private readonly injector: Injector,
              private readonly cacheStrategy: CacheViewStrategyService) {
    this.#parent.view = this
    // console.log(this.config);
  }

  ngOnChanges(changes: TypedSimpleChanges<CacheViewComponent>): void {

    if (changes.params) {
    }
    if (changes.path || changes.params) {
      // if (changes.path) {
      //   const currentValue = changes.path.currentValue;
      //   // console.log('Input Data changed:', currentValue);
      //   this.stateChange()
      // }
    }
  }

  private detach(): ComponentRef<any> | null {
    if (!this.activated) {
      return null;
    }

    this.viewContainerRef.detach();
    const cmp = this.activated;
    this.activated = null;

    return cmp;
  }

  private activateWith() {
    const config: CacheConfig = (this.config.find(value => value.path === this.path) ?? {}) as unknown as CacheConfig;
    this.snapshot = new ActivatedCacheSnapshot(this.path, this.params, config.data || {});

    const injector = Injector.create({
      providers: [
        { provide: ActivatedCacheSnapshot, useValue: this.snapshot },
      ],
      parent: this.injector
    });

    this.activated = this.viewContainerRef.createComponent(config.component, {
      injector,
      index: this.viewContainerRef.length
    });

    this.activePath.next(this.path);
  }

  private stateChange() {
    if (!this.activated) {
      this.activateWith()
    } else {
      const config = this.config.find(value => value.path === this.path)?.data ?? {};
      const snapshot = new ActivatedCacheSnapshot(this.path, this.params, config);

      if (this.cacheStrategy.shouldAttach(snapshot)) {
        this.detachAndStore();
        const stored = <DetachedCacheHandle>this.cacheStrategy.retrieve(snapshot);
        this.activated = stored.componentRef;
        this.snapshot = snapshot;
        this.viewContainerRef.insert(stored.componentRef.hostView);
        this.activePath.next(this.path);
      } else {
        this.detachAndStore();
        this.activateWith()
      }
    }
  }

  private detachAndStore() {
    if (this.cacheStrategy.shouldDetach(this.snapshot!)) {
      const componentRef = this.detach() || this.activated!;
      this.cacheStrategy.store(this.snapshot!, {componentRef})
    } else {
      this.detach()
    }
  }
}
