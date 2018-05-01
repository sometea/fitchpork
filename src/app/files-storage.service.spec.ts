import { TestBed, inject } from '@angular/core/testing';

import { FilesStorageService } from './files-storage.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

describe('FilesStorageService', () => {
  const FirebaseStorageStub = {
  };

  const FirebaseDbStub = {
    object: jasmine.createSpy('object'),
    list: jasmine.createSpy('list'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilesStorageService,
        { provide: AngularFireStorage, useValue: FirebaseStorageStub },
        { provide: AngularFireDatabase, useValue: FirebaseDbStub },
      ],
    });
  });

  it('should be created', inject([FilesStorageService], (service: FilesStorageService) => {
    expect(service).toBeTruthy();
  }));
});
