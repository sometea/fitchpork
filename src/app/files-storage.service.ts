import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import { AngularFireDatabase } from 'angularfire2/database';
import { FileUpload, FileUploadWithKey } from './admin/edit-file/fileupload';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { FirebaseStorage } from '@firebase/storage-types';

import { UploadProgress } from './upload-progress';
import { Observer } from 'rxjs/Observer';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class FilesStorageService {
  private filesInDb: AngularFireList<FileUpload>;

  constructor(private storage: AngularFireStorage, private firebaseDb: AngularFireDatabase) {
    this.filesInDb = this.firebaseDb.list('/files');
  }

  public add(fileUpload: FileUpload, file?: File): Observable<string> {
    return Observable.fromPromise(this.filesInDb.push(fileUpload))
      .flatMap(item => {
        return file ?
          this.storage.upload(fileUpload.filename, file).snapshotChanges().map(snapshot => item.key) :
          Observable.of(item.key);
      });
  }

  public update(key: string, image: FileUpload, file?: File): Observable<UploadProgress> {
    const noUpload: UploadProgress = {
      percentCompleted: 100,
      downloadUrl: '',
    };
    return this.get(key).first().flatMap(oldImage => {
      return Observable.fromPromise(this.filesInDb.update(key, image))
        .flatMap(() => {
          if (!file) {
            return Observable.of(noUpload);
          }
          return this.removeAndUpload(oldImage.filename, image.filename, file);
        });
    });
  }

  private removeAndUpload(oldFilename: string, newFilename: string, file: File): Observable<UploadProgress> {
    if (oldFilename) {
      this.storage.ref(oldFilename).delete();
    }
    return this.storage.ref(newFilename).put(file).snapshotChanges().map(snapshot => {
      return {
        percentCompleted: Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100),
        downloadUrl: snapshot.downloadURL ? snapshot.downloadURL : ''
      };
    });
  }

  public list(): Observable<FileUploadWithKey[]> {
    return this.filesInDb.snapshotChanges().map(actions => actions.map(action => {
      return {
        key: action.key,
        file: action.payload.val()
      };
     }));
  }

  public remove(key: string): Observable<void> {
    return this.firebaseDb.object<FileUpload>('/files/' + key).valueChanges()
      .first()
      .flatMap(image =>
        !image.filename ?
        Observable.fromPromise(this.firebaseDb.object('/files/' + key).remove()) :
        Observable.fromPromise(Promise.all([
          this.storage.ref(image.filename).delete(),
          this.firebaseDb.object('/files/' + key).remove()
          ])).map(x => null)
      );
  }

  public get(key: string): Observable<FileUpload> {
    return this.firebaseDb.object<FileUpload>('/files/' + key).valueChanges()
      .flatMap((fileUpload: FileUpload) => {
        return !fileUpload.filename ?
          Observable.of(fileUpload) :
          this.storage.ref(fileUpload.filename).getDownloadURL()
            .map(url => {
              fileUpload.url = url;
              return fileUpload;
            });
      });
  }
}
