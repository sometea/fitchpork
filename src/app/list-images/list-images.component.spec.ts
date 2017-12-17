import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListImagesComponent } from './list-images.component';
import { ImagesStorageService } from '../images-storage.service';
import { Observable } from 'rxjs';

describe('ListImagesComponent', () => {
  let component: ListImagesComponent;
  let fixture: ComponentFixture<ListImagesComponent>;

  const imagesStorageServiceStub = {
    list: jasmine.createSpy('list').and.returnValue(Observable.of([])),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ListImagesComponent ],
      providers: [
        { provide: ImagesStorageService, useValue: imagesStorageServiceStub },
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
