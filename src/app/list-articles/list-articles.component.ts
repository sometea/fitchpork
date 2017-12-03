import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../edit-article/article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  private articles: Observable<Article[]>;

  constructor(private articlesService: ArticlesService) { 
    this.articles = articlesService.getArticles();
  }

  ngOnInit() {
  }

}
