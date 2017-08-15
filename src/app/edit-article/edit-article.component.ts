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
  @Input() key: string;
  @Output() onRemove = new EventEmitter<string>();

  user: Observable<firebase.User>;
  loggedIn: Observable<boolean>;
  editingMode: boolean = false;

  constructor(private auth: AuthenticationService) {
      this.user = auth.getAuthState();
      this.loggedIn = auth.getAuthState().map(user => (user !== null));
   }

  ngOnInit() {
  }

  emitRemove() {
    this.onRemove.emit(this.key);
  }

  edit() {
    this.editingMode = !this.editingMode;
  }

}
