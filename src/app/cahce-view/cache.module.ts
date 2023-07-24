import {InjectionToken, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CacheViewComponent, PARENT} from "./cache-view.component";
import {CacheConfig, CONFIG} from "./token";
import { ViewLinkDirective } from './view-link.directive';



@NgModule({
  declarations: [
    CacheViewComponent,
    ViewLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CacheViewComponent,
    ViewLinkDirective
  ]
})
export class CacheModule {
  // static forRoot(config: CacheConfig[]): ModuleWithProviders<CacheModule> {
  //   return {
  //     ngModule: CacheModule,
  //     providers: [
  //       {provide: CONFIG, useValue: config},
  //       {provide: PARENT, useValue: {}},
  //     ]
  //   }
  // }

  static providers(config: CacheConfig[]): Provider[] {
    return [
      {provide: CONFIG, useValue: config},
      {provide: PARENT, useValue: {}},
    ]
  }
}
