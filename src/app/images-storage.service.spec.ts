import { TestBed, inject } from '@angular/core/testing';

import { FilesStorageService } from './files-storage.service';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

describe('FilesStorageService', () => {
  const FirebaseAppStub = { 
    storage: jasmine.createSpy('storage'),
  };

  const FirebaseDbStub = {
    object: jasmine.createSpy('object'),
    list: jasmine.createSpy('list'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilesStorageService,
        { provide: FirebaseApp, useValue: FirebaseAppStub },
        { provide: AngularFireDatabase, useValue: FirebaseDbStub },
      ],
    });
  });

  it('should be created', inject([FilesStorageService], (service: FilesStorageService) => {
    expect(service).toBeTruthy();
  }));
});
