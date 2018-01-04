import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { HomeComponent } from './home.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { ArticlesService } from '../articles.service';
import { FormsModule } from '@angular/forms/';
import { ViewArticleComponent } from '../view-article/view-article.component';
import { EditImageComponent } from '../image/edit-image.component';
import { ImagesStorageService } from '../images-storage.service';
import { AuthenticationService } from '../authentication.service';
import { ListArticlesComponent } from '../list-articles/list-articles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ListImagesComponent } from '../list-images/list-images.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const articlesServiceStub = {
    list: jasmine.createSpy('list').and.returnValue(Observable.of([]))
  };

  const authenticationServiceStub = {
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(Observable.of(true))
  };

  const imagesStorageServiceStub = {
    list: jasmine.createSpy('list').and.returnValue(Observable.of([])),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [ 
        HomeComponent,
        EditArticleComponent,
        ViewArticleComponent,
        ListArticlesComponent,
        ListImagesComponent,
      ],
      providers: [
        { provide: ArticlesService, useValue: articlesServiceStub },
        { provide: ImagesStorageService, useValue: imagesStorageServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
