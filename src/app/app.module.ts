import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesService } from "./articles.service";

export const firebaseConfig = {
  apiKey: 'AIzaSyAb1sj2z72ouD3rxTJ7Vm-Dp6N8QY1LfHI',
  authDomain: 'fitchpork-ae1b0.firebaseapp.com',
  databaseURL: 'https://fitchpork-ae1b0.firebaseio.com',
  storageBucket: 'fitchpork-ae1b0.appspot.com',
  messagingSenderId: '412599837108'
}

@NgModule({
  declarations: [
    AppComponent,
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
