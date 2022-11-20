import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import {PagesModule} from "./pages/pages.module";
import {JwtModule} from "@auth0/angular-jwt";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModelModule} from "./model/model.module";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


export function jwtTokenGetter(): string {
  // @ts-ignore
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ModelModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }