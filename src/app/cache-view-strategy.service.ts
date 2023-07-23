import {ComponentRef, Injectable} from '@angular/core';

export class ActivatedCacheSnapshot {
  constructor(public readonly path: string,
              public readonly params: Record<string, string>,
              public readonly data: Record<string, any>) {
  }
}

export type DetachedCacheHandle = {
  componentRef: ComponentRef<any>,
};
@Injectable({
  providedIn: 'root'
})
export class CacheViewStrategyService {
  private cache: Record<string, DetachedCacheHandle> = {}
  /**
   * 决定是否应该缓存某个组件。你可以基于某些条件来判断是否需要缓存该组件。
   * @param route
   */
  shouldDetach(route: ActivatedCacheSnapshot): boolean {
    return true
  }

  /**
   *  当shouldDetach返回true时，你可以在这里保存路由组件的DetachedCacheHandle，以便稍后重用。
   * @param route
   * @param handle
   */
  store(route: ActivatedCacheSnapshot, handle: DetachedCacheHandle|null): void {
    if (!handle) {
      return
    }

    this.cache[route.path] = handle;
  }

  /**
   * 决定是否应该重用缓存中的组件。你可以检查某些条件并决定是否从缓存中获取组件。
   * @param route
   */
  shouldAttach(route: ActivatedCacheSnapshot): boolean {
    return !!this.cache[route.path]
  }

  /**
   * 当shouldAttach返回true时，从缓存中获取组件的DetachedCacheHandle
   * @param route
   */
  retrieve(route: ActivatedCacheSnapshot): DetachedCacheHandle|null {
    return this.cache[route.path]
  }

  /**
   * 在每次切换之前调用此方法，决定当前组件是否应该重用。你可以根据当前组件快照和即将激活的组件快照进行比较，根据需要返回true或false。
   * @param future
   * @param curr
   */
  // shouldReuseRoute(future: ActivatedCacheSnapshot, curr: ActivatedCacheSnapshot): boolean {
  //   return false
  // }
  constructor() { }
}
