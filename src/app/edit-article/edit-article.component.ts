import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from './article';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
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
      return this.articlesService.get(this.key);
    }).subscribe(article => {
      this.article = article;
    });
  }

  public submit() {
    this.articlesService.update(this.key, this.article);
    this.router.navigate(['/']);
  }

  public cancel() {
    this.router.navigate(['/']);
  }

  public delete() {
    this.articlesService.remove(this.key);
    this.router.navigate(['/']);
  }
}
