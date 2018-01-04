import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesService } from './articles.service';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { EditImageComponent } from './image/edit-image.component';
import { ImagesStorageService } from './images-storage.service';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ListImagesComponent } from './list-images/list-images.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAb1sj2z72ouD3rxTJ7Vm-Dp6N8QY1LfHI',
  authDomain: 'fitchpork-ae1b0.firebaseapp.com',
  databaseURL: 'https://fitchpork-ae1b0.firebaseio.com',
  storageBucket: 'fitchpork-ae1b0.appspot.com',
  messagingSenderId: '412599837108'
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles/:id', component: EditArticleComponent },
  { path: 'images/:id', component: EditImageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EditArticleComponent,
    HomeComponent,
    ViewArticleComponent,
    EditImageComponent,
    ListArticlesComponent,
    ListImagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatListModule,
  ],
  providers: [
    ArticlesService,
    AuthenticationService,
    ImagesStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
