import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ArticlesService } from './articles.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { EditArticleComponent } from "./edit-article/edit-article.component";
import { ViewArticleComponent } from './view-article/view-article.component';
import { ImageComponent } from './image/image.component';
import { ImagesStorageService } from './images-storage.service';
import { ListArticlesComponent } from './list-articles/list-articles.component';

describe('AppComponent', () => {
  const authenticationServiceStub = {
    getAuthState: jasmine.createSpy('getAuthState'),
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(Observable.of(true)),
    login() { },
    logout() { }
  };

  const articlesServiceStub = {
    getArticles: jasmine.createSpy('getArticles').and.returnValue(Observable.of([])),
  };

  const imagesStorageServiceStub = {
    
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        EditArticleComponent,
        ViewArticleComponent,
        ListArticlesComponent,
        ImageComponent,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ArticlesService, useValue: articlesServiceStub },
        { provide: ImagesStorageService, useValue: imagesStorageServiceStub },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render the user id', fakeAsync(() => {
    authenticationServiceStub.getAuthState.and.returnValue(Observable.of({ uid: '1' }));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(authenticationServiceStub.getAuthState).toHaveBeenCalled();
    expect(compiled.querySelector('#userid').textContent).toContain('User ID: 1');
  }));
});
