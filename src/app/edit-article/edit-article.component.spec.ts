import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditArticleComponent } from './edit-article.component';
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs/Observable";
import { Article } from "./article";
import { FormsModule } from "@angular/forms";

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  const authenticationServiceStub = {
      getAuthState() {
        return Observable.of({ uid: '1' });
      },
      isLoggedIn() {
        return Observable.of(true);
      },
      login() { },
      logout() { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
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

  it('should have remove and edit buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#edit').textContent).toContain('Edit');
    expect(compiled.querySelector('#remove').textContent).toContain('Remove');
  });

  it('should hide edit and remove buttons by default', () => {
    component.loggedIn = Observable.of(false);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#edit')).toBeNull();
  })
});
