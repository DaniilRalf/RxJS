import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { IntensiveComponent } from './intensive/intensive.component';
import { OperatorsComponent } from './operators/operators.component';
import { ObsSubjBehsubjComponent } from './obs-subj-behsubj/obs-subj-behsubj.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component,
    Test3Component,
    IntensiveComponent,
    OperatorsComponent,
    ObsSubjBehsubjComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
