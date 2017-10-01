import { TestBed, inject } from '@angular/core/testing';

import { ImagesStorageService } from './images-storage.service';

describe('ImagesStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagesStorageService]
    });
  });

  it('should be created', inject([ImagesStorageService], (service: ImagesStorageService) => {
    expect(service).toBeTruthy();
  }));
});
