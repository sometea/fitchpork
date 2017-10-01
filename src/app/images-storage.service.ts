import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';

@Injectable()
export class ImagesStorageService {
  private storage: firebase.storage.Storage;

  constructor(private firebaseApp: FirebaseApp) {
      this.storage = firebaseApp.storage();
   }

}
