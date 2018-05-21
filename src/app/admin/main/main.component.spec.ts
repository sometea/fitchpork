import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const authenticationServiceStub = {
    getAuthState: jasmine.createSpy('getAuthState'),
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(Observable.of(true)),
    login() { },
    logout() { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [ MainComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the user id', fakeAsync(() => {
    authenticationServiceStub.getAuthState.and.returnValue(Observable.of({ email: 'test@test.de' }));
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(authenticationServiceStub.getAuthState).toHaveBeenCalled();
    expect(compiled.querySelector('#userid').textContent).toContain('User: test@test.de');
  }));
});
