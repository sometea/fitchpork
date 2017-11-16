import { TestBed, inject } from '@angular/core/testing';

import { ImagesStorageService } from './images-storage.service';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

describe('ImagesStorageService', () => {
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
        ImagesStorageService,
        { provide: FirebaseApp, useValue: FirebaseAppStub },
        { provide: AngularFireDatabase, useValue: FirebaseDbStub },
      ],
    });
  });

  it('should be created', inject([ImagesStorageService], (service: ImagesStorageService) => {
    expect(service).toBeTruthy();
  }));
});
