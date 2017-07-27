import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonsFrameComponent } from './buttons-frame/buttons-frame.component';
import { RouterModule, Routes } from '@angular/router';
import { EmotionRecAPIComponent } from './emotion-rec-api/emotion-rec-api.component';
import { DialogComponent } from './emotion-rec-api/emotion-rec-api.component';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { FaceAPIComponent } from './face-api/face-api.component';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MdProgressSpinnerModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { VisionComponent } from './vision/vision.component';


const appRoutes: Routes = [
  { path: '', component: EmotionRecAPIComponent },
  { path: 'emotionAPI', component: EmotionRecAPIComponent },
  { path: 'faceAPI', component: FaceAPIComponent },
  { path: 'visioAPI', component: VisionComponent},
  { path: '*', component: EmotionRecAPIComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonsFrameComponent,
    EmotionRecAPIComponent,
    FaceAPIComponent,
    DialogComponent,
    VisionComponent
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
    MdTabsModule,
    MdDialogModule,
    MdSidenavModule,
    MdToolbarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
