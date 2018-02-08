import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../edit-article/article';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  public articles: Observable<Article[]>;

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
      date: 'Today',
    };
    this.articlesService.add(article).subscribe(key => this.router.navigate(['/articles/' + key]));
  }
}
