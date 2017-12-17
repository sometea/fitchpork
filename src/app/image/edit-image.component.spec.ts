import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { EditImageComponent } from './edit-image.component';
import { ImagesStorageService } from '../images-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('ImageComponent', () => {
  let component: EditImageComponent;
  let fixture: ComponentFixture<EditImageComponent>;

  const ImagesStorageServiceStub = { 
    upload: jasmine.createSpy('upload').and.returnValue(Observable.of('testFileName')),
    getUrl: jasmine.createSpy('getUrl').and.returnValue(Observable.of('testUrl')),
    delete: jasmine.createSpy('delete').and.returnValue(Observable.of(null)),
  };

  const paramMapStub = {
    get: jasmine.createSpy('get').and.returnValue(''),
  };

  const activatedRouteStub = {
      paramMap: Observable.of(paramMapStub),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImageComponent ],
      providers: [
        { provide: ImagesStorageService, useValue: ImagesStorageServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should upload an image', () => {
    const mockFileList = {
      length: 1,
      item: index => new File([], 'testFile'),
    };
    component.handleFiles(mockFileList);
    expect(ImagesStorageServiceStub.upload).toHaveBeenCalled();
  });
});
