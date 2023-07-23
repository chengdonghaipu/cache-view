import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CacheViewComponent} from "./cache-view.component";
import {CacheConfig, CONFIG} from "./token";



@NgModule({
  declarations: [
    CacheViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CacheViewComponent
  ]
})
export class CacheModule {
  static forRoot(config: CacheConfig[]): ModuleWithProviders<CacheModule> {
    return {
      ngModule: CacheModule,
      providers: [
        {provide: CONFIG, multi: true, useValue: config}
      ]
    }
  }
}
