import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) { }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.map(user => (user !== null));
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
