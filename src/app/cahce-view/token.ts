import {InjectionToken, Type} from "@angular/core";

export interface CacheConfig {
  path: string;
  component: Type<any>
  data?: Record<string, any>
}

export const CONFIG = new InjectionToken<CacheConfig[][]>('CACHE_VIEW_CONFIG');
