import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { ArticleWithKey, Article, ArticleType } from '../edit-article/article';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  public articles: Observable<ArticleWithKey[]>;

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {
    this.articles = articlesService.list();
  }

  ngOnInit() {
  }

  addArticle() {
    const article: Article = {
      title: 'A new article',
      text: 'This article has just been created',
      date: (new Date()).toString(),
      type: ArticleType.News,
      thumbnail: '',
    };
    this.articlesService.add(article).subscribe(key => this.router.navigate(['/admin/articles/' + key]));
  }
}
