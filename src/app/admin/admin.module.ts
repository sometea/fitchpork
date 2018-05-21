import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-md';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MarkdownModule.forRoot(),
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
  ],
  declarations: [
    EditArticleComponent,
    EditFileComponent,
    HomeComponent,
    ListArticlesComponent,
    ListFilesComponent,
    ViewArticleComponent,
    MainComponent,
  ]
})
export class AdminModule { }
