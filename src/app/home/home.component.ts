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
  public isLoggedIn: Observable<boolean>;
  private articles: Observable<Article[]>;

  constructor(
    private articlesService: ArticlesService,
    private authenticationService: AuthenticationService,

  ) {
      this.isLoggedIn = authenticationService.isLoggedIn();
      this.articles = articlesService.getArticles();
   }

  ngOnInit() {
  }

  removeArticle(key: string) {
    this.articlesService.removeArticle(key);
  }

  addArticle() {
    const article: Article = {
      title: 'A new article',
      text: 'This article has just been created',
      date: 'Today',
    };
    this.articlesService.addArticle(article);
  }
}
