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

  public add(image: Image, file?: File): Observable<string> {
    return Observable.fromPromise(this.filesInDb.push(image))
      .flatMap(item => {
        return file ?
          Observable.fromPromise(this.storage.ref().child(image.filename).put(file)).map(snapshot => item.key) :
          Observable.of(item.key);
      });
  }

  public update(key: string, image: Image, file?: File): Observable<string> {
    return this.get(key).flatMap(oldImage => {
      return Observable.fromPromise(this.filesInDb.update(key, image))
        .flatMap(item => {
          if (!file) {
            return Observable.of(key);
          }
          if (!oldImage.filename) {
            return Observable.fromPromise(this.storage.ref(image.filename).put(file)).map(snapshot => key);
          }
          return this.deleteAndUpload(oldImage.filename, image.filename, file).map(filename => key);
        });
    });
  }

  private deleteAndUpload(oldFilename: string, newFilename: string, file: File): Observable<string> {
    return Observable.fromPromise(Promise.all([
      this.storage.ref(oldFilename).delete(),
      this.storage.ref(newFilename).put(file)
    ])).map(result => newFilename);
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
      .flatMap(image => {
        return image.filename ?
          Observable.fromPromise(this.storage.ref().child(image.filename).getDownloadURL()) :
          Observable.of('');
      });
  }

  public get(key: string): Observable<Image> {
    return this.firebaseDb.object('images/' + key);
  }
}
