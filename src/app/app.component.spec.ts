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
import { ImagesStorageService } from './images-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
    authenticationServiceStub.getAuthState.and.returnValue(Observable.of({ email: 'test@test.de' }));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(authenticationServiceStub.getAuthState).toHaveBeenCalled();
    expect(compiled.querySelector('#userid').textContent).toContain('User: test@test.de');
  }));
});
