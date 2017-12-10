import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { HomeComponent } from './home.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { ArticlesService } from '../articles.service';
import { FormsModule } from '@angular/forms/';
import { ViewArticleComponent } from '../view-article/view-article.component';
import { ImageComponent } from '../image/image.component';
import { ImagesStorageService } from '../images-storage.service';
import { AuthenticationService } from '../authentication.service';
import { ListArticlesComponent } from '../list-articles/list-articles.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const articlesServiceStub = {
    getArticles: jasmine.createSpy('getArticles').and.returnValue(Observable.of([]))
  };

  const authenticationServiceStub = {
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(Observable.of(true))
  };

  const imagesStorageServiceStub = {};

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
        ImageComponent,
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
