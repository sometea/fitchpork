import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from './article';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase/app';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  private article: Article;
  private key: string;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.key = params.get('id');
      return this.articlesService.getArticle(this.key);
    }).subscribe(article => {
      this.article = article;
    });
  }

  public submit() {
    this.articlesService.updateArticle(this.key, this.article);
    this.router.navigate(['/']);
  }
}
