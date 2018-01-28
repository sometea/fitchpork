import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

export interface User {
  email: string,
  password: string,
}

@Injectable()
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) { }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.map(user => (user !== null));
  }

  login(userToLogIn: User): Observable<string> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(userToLogIn.email, userToLogIn.password)
    ).catch(error => Observable.of(error.message));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
