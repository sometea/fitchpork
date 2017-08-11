import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditArticleComponent } from './edit-article.component';
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs/Observable";
import { Article } from "./article";

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  beforeEach(async(() => {
    const authenticationServiceStub = {
      getAuthState() {
        return Observable.of({ uid: 'test' });
      },
      login() { },
      logout() { }
    }

    TestBed.configureTestingModule({
      declarations: [ EditArticleComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    component.article = new Article()
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should know if the user is logged in', () => {
    component.loggedIn().subscribe(loggedIn => {
      expect(loggedIn).toBeTruthy();
    })
  });

  it('should have remove and edit buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#edit').textContent).toContain('Edit');
  });
});
