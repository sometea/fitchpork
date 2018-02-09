import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { ArticlesService } from '../articles.service';
import { FormsModule } from '@angular/forms/';
import { ImagesStorageService } from '../images-storage.service';
import { AuthenticationService } from '../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
