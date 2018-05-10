import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles/:id', component: EditArticleComponent },
  { path: 'files/:id', component: EditFileComponent },
  { path: 'files', component: ListFilesComponent },
  { path: 'articles', component: ListArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
