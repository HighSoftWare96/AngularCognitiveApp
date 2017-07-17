import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonsFrameComponent } from './buttons-frame/buttons-frame.component';
import { RouterModule, Routes } from '@angular/router';
import { EmotionRecAPIComponent } from './emotion-rec-api/emotion-rec-api.component';
import { Http, RequestOptionsArgs, Headers } from "@angular/http";
import { FaceAPIComponent } from './face-api/face-api.component';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";
import {MdProgressSpinnerModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';

const appRoutes: Routes = [
  { path: '', component: EmotionRecAPIComponent },
  { path: 'emotionAPI', component: EmotionRecAPIComponent },
  { path: 'faceAPI', component: FaceAPIComponent },
  // { path: 'faceAPI', component: FaceAPIComponent },
  // { path: 'faceAPI', component: FaceAPIComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonsFrameComponent,
    EmotionRecAPIComponent,
    FaceAPIComponent,

  ],
  imports: [
    BrowserModule,
    MdButtonModule,
    MdCheckboxModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdIconModule,
    FormsModule,
    MdTooltipModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    MdGridListModule,
    MdListModule,
    MdSidenavModule,        
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
