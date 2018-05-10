import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    EditArticleComponent,
    EditFileComponent,
    HomeComponent,
    ListArticlesComponent,
    ListFilesComponent,
    ViewArticleComponent,
  ]
})
export class AdminModule { }
