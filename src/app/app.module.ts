import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CacheViewComponent} from "./cahce-view/cache-view.component";
import {CacheModule} from "./cahce-view/cache.module";
import {Tab1Component} from "./tab1.component";
import {Tab2Component} from "./tab2.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CacheModule.forRoot([
      {
        path: 'tab1',
        component: Tab1Component,
        data: {
          name: 'tab1'
        }
      },
      {
        path: 'tab2',
        component: Tab2Component,
        data: {
          name: 'tab2'
        }
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
