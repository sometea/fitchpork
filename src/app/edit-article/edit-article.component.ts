import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from './article';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() onChange = new EventEmitter<Article>();

  constructor() { }

  ngOnInit() {
  }

  public submit() {
    this.onChange.emit(this.article);
  }
}
