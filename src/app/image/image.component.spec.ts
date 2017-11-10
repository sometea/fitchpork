import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ImageComponent } from './image.component';
import { ImagesStorageService } from '../images-storage.service';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  const ImagesStorageServiceStub = { 
    upload: jasmine.createSpy('upload').and.returnValue(Observable.of('testFileName')),
    getUrl: jasmine.createSpy('getUrl').and.returnValue(Observable.of('testUrl')),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ],
      providers: [
        { provide: ImagesStorageService, useValue: ImagesStorageServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
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
