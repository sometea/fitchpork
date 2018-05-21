import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { EditArticleComponent } from './admin/edit-article/edit-article.component';
import { ArticlesService } from './articles.service';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './admin/home/home.component';
import { ViewArticleComponent } from './admin/view-article/view-article.component';
import { EditFileComponent } from './admin/edit-file/edit-file.component';
import { FilesStorageService } from './files-storage.service';
import { ListArticlesComponent } from './admin/list-articles/list-articles.component';
import { ListFilesComponent } from './admin/list-files/list-files.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAb1sj2z72ouD3rxTJ7Vm-Dp6N8QY1LfHI',
  authDomain: 'fitchpork-ae1b0.firebaseapp.com',
  databaseURL: 'https://fitchpork-ae1b0.firebaseio.com',
  storageBucket: 'fitchpork-ae1b0.appspot.com',
  messagingSenderId: '412599837108'
};

const routes: Routes = [
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '', loadChildren: 'app/site/site.module#SiteModule' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
  ],
  providers: [
    ArticlesService,
    AuthenticationService,
    FilesStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
