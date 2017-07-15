import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonsFrameComponent } from './buttons-frame/buttons-frame.component';
import { RouterModule, Routes } from '@angular/router';
import { EmotionRecAPIComponent } from './emotion-rec-api/emotion-rec-api.component';
import { Http, RequestOptionsArgs, Headers } from "@angular/http";
import { FaceAPIComponent } from './face-api/face-api.component';

const appRoutes: Routes = [
  { path: '', component: EmotionRecAPIComponent},
  { path: 'emotionAPI', component: EmotionRecAPIComponent},
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
    FaceAPIComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
