import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Article } from './article';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() key: string;
  @Output() onRemove = new EventEmitter<string>();

  user: Observable<firebase.User>;


  constructor(private auth: AuthenticationService) {
      this.user = auth.getAuthState();
   }

  ngOnInit() {
  }

  emitRemove() {
    this.onRemove.emit(this.key);
  }

}
