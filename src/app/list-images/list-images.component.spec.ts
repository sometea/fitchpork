import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListImagesComponent } from './list-images.component';
import { FilesStorageService } from '../files-storage.service';
import { Observable } from 'rxjs/Observable';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListImagesComponent', () => {
  let component: ListImagesComponent;
  let fixture: ComponentFixture<ListImagesComponent>;

  const imagesStorageServiceStub = {
    list: jasmine.createSpy('list').and.returnValue(Observable.of([])),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ListImagesComponent ],
      providers: [
        { provide: FilesStorageService, useValue: imagesStorageServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
