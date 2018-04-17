import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import { AngularFireDatabase } from 'angularfire2/database';
import { FileUpload, FileUploadWithKey } from './edit-file/fileupload';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { FirebaseStorage } from '@firebase/storage-types';

import { UploadProgress } from './upload-progress';

@Injectable()
export class FilesStorageService {
  private storage: FirebaseStorage;
  private filesInDb: AngularFireList<FileUpload>;

  constructor(private firebaseApp: FirebaseApp, private firebaseDb: AngularFireDatabase) {
    this.storage = firebaseApp.storage();
    this.filesInDb = this.firebaseDb.list('/files');
  }

  public add(fileUpload: FileUpload, file?: File): Observable<string> {
    return Observable.fromPromise(this.filesInDb.push(fileUpload))
      .flatMap(item => {
        return file ?
          Observable.fromPromise(this.storage.ref().child(fileUpload.filename).put(file)).map(snapshot => item.key) :
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
    const uploadTask = this.storage.ref(newFilename).put(file);
    return Observable.create((observer: Observer<UploadProgress>) => {
      uploadTask.on('state_changed', (snapshot: any) => {
        const uploadProgress: UploadProgress = {
          percentCompleted: Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100),
          downloadUrl: '',
        };
        observer.next(uploadProgress);
      }, error => {
        observer.error(error);
      }, () => {
        const uploadProgress: UploadProgress = {
          percentCompleted: 100,
          downloadUrl: uploadTask.snapshot.downloadURL,
        }
        observer.next(uploadProgress);
        observer.complete();
      });
    });
  }

  public list(): Observable<FileUploadWithKey[]> {
    return this.filesInDb.snapshotChanges().map(actions => actions.map(action => {
      let imageWithKey: FileUploadWithKey = {
        key: action.key,
        file: action.payload.val()
      };
      return imageWithKey;
     }));
  }

  public remove(key: string): Observable<void> {
    return this.firebaseDb.object<FileUpload>('/files/' + key).valueChanges()
      .first()
      .flatMap(image =>
        !image.filename ?
        Observable.fromPromise(this.firebaseDb.object('/files/' + key).remove()) :
        Observable.fromPromise(Promise.all([
          this.storage.ref().child(image.filename).delete(),
          this.firebaseDb.object('/files/' + key).remove()
          ])).map(x => null)
      );
  }

  public get(key: string): Observable<FileUpload> {
    return this.firebaseDb.object<FileUpload>('/files/' + key).valueChanges()
      .flatMap((fileUpload: FileUpload) => {
        return !fileUpload.filename ?
          Observable.of(fileUpload) :
          Observable.fromPromise(this.storage.ref().child(fileUpload.filename).getDownloadURL())
            .map(url => {
              fileUpload.url = url;
              return fileUpload;
            })
      });
  }
}
