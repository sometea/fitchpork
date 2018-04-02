import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MarkdownModule } from 'ngx-md';

import { AppComponent } from './app.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticlesService } from './articles.service';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { FilesStorageService } from './files-storage.service';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ListFilesComponent } from './list-files/list-files.component';

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
  { path: 'files/:id', component: EditFileComponent },
  { path: 'files', component: ListFilesComponent },
  { path: 'articles', component: ListArticlesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EditArticleComponent,
    HomeComponent,
    ViewArticleComponent,
    EditFileComponent,
    ListArticlesComponent,
    ListFilesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
  ],
  providers: [
    ArticlesService,
    AuthenticationService,
    FilesStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
