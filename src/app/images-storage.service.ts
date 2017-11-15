import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ImagesStorageService {
  private storage: firebase.storage.Storage;
  private filesInDb: FirebaseListObservable<any[]>;

  constructor(private firebaseApp: FirebaseApp, private firebaseDb: AngularFireDatabase) {
      this.storage = firebaseApp.storage();
      this.filesInDb = this.firebaseDb.list('/images');
   }

   public upload(file: File): Observable<string> {
     return Observable.fromPromise(this.filesInDb.push(file.name)).flatMap(item => Observable.fromPromise(this.storage.ref().child(item.key).put(file)).map(snapshot => item.key));
   }

   public update(key: string, file: File): Observable<string> {
     return this.firebaseDb.object('/images/' + key)
      .flatMap(filename => Observable.fromPromise(this.storage.ref().child(filename).put(file)).map(snapshot => key));
   }

   public delete(key: string): Observable<void> {
     let reference: firebase.storage.Reference;
     try {
       return this.firebaseDb.object('/images/' + key).flatMap(filename => {
        reference = this.storage.ref().child(filename);
        this.filesInDb.remove(filename);
        return Observable.fromPromise(reference.delete());
       });
     } catch (e) {
       return Observable.of(null);
     }
   }

   public getUrl(key: string): Observable<string> {
     return this.firebaseDb.object('/images/' + key).flatMap(filename => {
      return Observable.fromPromise(this.storage.ref().child(filename).getDownloadURL());
     });
   }
}
