import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from "../edit-article/article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
  }

  removeArticle(key: string) {
    this.articlesService.removeArticle(key);
  }

  updateArticle(key: string, newArticle: Article) {
    this.articlesService.updateArticle(key, newArticle);
  }
}
