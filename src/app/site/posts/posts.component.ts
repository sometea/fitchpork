import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { Observable } from 'rxjs/Observable';
import { ArticleWithKey, ArticleType } from '../../admin/edit-article/article';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Observable<ArticleWithKey[]>;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.posts = this.articlesService.list(ArticleType.News);
  }

}
