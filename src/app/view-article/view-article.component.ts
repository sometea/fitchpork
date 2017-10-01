import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../edit-article/article';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  @Input() article: Article;
  @Output() onEdit = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  loggedIn: Observable<boolean>;

  constructor(private auth: AuthenticationService) {
      this.loggedIn = auth.isLoggedIn();
   }

  ngOnInit() {
  }

  public emitEdit() {
    this.onEdit.emit();
  }

  public emitRemove() {
    this.onRemove.emit();
  }
}
