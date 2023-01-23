
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { OperationsComponent } from './operations/operations.component';
import { TableComponent } from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    OperationsComponent,

    TableComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  
  
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC-y4oHXxQthKUm6QBrlXEpZDgSbNDRtfQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
