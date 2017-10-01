import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesService } from './articles.service';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { ViewArticleComponent } from './view-article/view-article.component';

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
    EditArticleComponent,
    HomeComponent,
    ViewArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    ArticlesService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
