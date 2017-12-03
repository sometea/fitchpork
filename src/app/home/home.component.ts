import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from "../edit-article/article";
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private articlesBeingEdited: {[key: string]: boolean} = {};
  public isLoggedIn: Observable<boolean>;
  private articles: Observable<Article[]>;

  constructor(private articlesService: ArticlesService, private authenticationService: AuthenticationService) {
      this.isLoggedIn = authenticationService.isLoggedIn();
      this.articles = articlesService.getArticles();
   }

  ngOnInit() {
  }

  removeArticle(key: string) {
    this.articlesService.removeArticle(key);
  }

  updateArticle(key: string, newArticle: Article) {
    delete this.articlesBeingEdited[key];
    this.articlesService.updateArticle(key, newArticle);
  }

  editArticle(key: string) {
    if (this.articlesBeingEdited[key]) {
      delete this.articlesBeingEdited[key];
    }
    this.articlesBeingEdited[key] = true;
  }

  editingMode(key: string): boolean {
    return this.articlesBeingEdited[key];
  }
}
