import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class ImagesStorageService {
  private storage: firebase.storage.Storage;

  constructor(private firebaseApp: FirebaseApp) {
      this.storage = firebaseApp.storage();
   }

   public upload(file: File): Observable<string> {
     return Observable.fromPromise(this.storage.ref().child(file.name).put(file)).map(snapshot => file.name);
   }

   public delete(filename: string): Observable<void> {
      if (filename === '') {
        return Observable.of(null);
      }
      return Observable.fromPromise(this.storage.ref().child(filename).delete());
   }

   public getUrl(filename: string): Observable<string> {
     return Observable.fromPromise(this.storage.ref().child(filename).getDownloadURL());
   }
}
