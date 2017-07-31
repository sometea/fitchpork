import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() key: string;
  @Output() onRemove = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitRemove() {
    this.onRemove.emit(this.key);
  }

}
