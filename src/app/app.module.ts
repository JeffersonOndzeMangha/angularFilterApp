import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FilterService } from './services/filter.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterviewComponent } from './filterview/filterview.component';
import { AppRoutingModule } from './app-routing.module';
import { CleanUrlPipe } from './clean-url.pipe';
import { ToDatePipe } from './to-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterviewComponent,
    CleanUrlPipe,
    ToDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
