import { Component, OnInit, Input } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }

}
