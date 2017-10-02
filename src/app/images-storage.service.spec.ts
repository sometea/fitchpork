import { TestBed, inject } from '@angular/core/testing';

import { ImagesStorageService } from './images-storage.service';
import { FirebaseApp } from 'angularfire2';

describe('ImagesStorageService', () => {
  const FirebaseAppStub = { 
    storage: jasmine.createSpy('storage'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImagesStorageService,
        { provide: FirebaseApp, useValue: FirebaseAppStub }
      ],
    });
  });

  it('should be created', inject([ImagesStorageService], (service: ImagesStorageService) => {
    expect(service).toBeTruthy();
  }));
});
