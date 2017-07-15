import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonsFrameComponent } from './buttons-frame/buttons-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonsFrameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
