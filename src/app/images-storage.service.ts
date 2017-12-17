import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Image } from './image/image';

@Injectable()
export class ImagesStorageService {
  private storage: firebase.storage.Storage;
  private filesInDb: FirebaseListObservable<any[]>;

  constructor(private firebaseApp: FirebaseApp, private firebaseDb: AngularFireDatabase) {
      this.storage = firebaseApp.storage();
      this.filesInDb = this.firebaseDb.list('/images');
   }

   public upload(file: File, image: Image): Observable<string> {
     image.filename = file.name;
     return Observable.fromPromise(this.filesInDb.push(image))
      .flatMap(item => Observable.fromPromise(this.storage.ref().child(image.filename).put(file)).map(snapshot => item.key));
   }

   public update(key: string, file: File, image: Image): Observable<Image> {
     return this.firebaseDb.object('/images/' + key)
      .flatMap(image => Observable.fromPromise(this.storage.ref().child(image.filename).put(file)).map(snapshot => image));
   }

   public list(): Observable<Image[]> {
     return this.filesInDb;
   }

   public delete(key: string): Observable<void> {
     return this.firebaseDb.object('/images/' + key)
      .flatMap(image =>
        image.filename === null ?
          Observable.of(null) :
          Observable.fromPromise(Promise.all([
            this.storage.ref().child(image.filename).delete(),
            this.firebaseDb.object('/images/' + key).remove()
          ])).map(x => null)
      );
   }

   public getUrl(key: string): Observable<string> {
     return this.firebaseDb.object('/images/' + key)
     .flatMap(image => Observable.fromPromise(this.storage.ref().child(image.filename).getDownloadURL()));
   }

   public get(key: string): Observable<Image> {
     return this.firebaseDb.object('images/' + key);
   }

   public addImage(image: Image): Observable<string> {
     return Observable.fromPromise(this.filesInDb.push(image)).map(item => item.key);
   }
}
