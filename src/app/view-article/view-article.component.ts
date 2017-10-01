import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../edit-article/article';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() onEdit = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public emitEdit() {
    this.onEdit.emit();
  }

  public emitRemove() {
    this.onRemove.emit();
  }
}
