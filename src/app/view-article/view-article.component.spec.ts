import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticleComponent } from './view-article.component';
import { ArticlesService } from '../articles.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';
import { Article } from '../edit-article/article';

describe('ViewArticleComponent', () => {
  let component: ViewArticleComponent;
  let fixture: ComponentFixture<ViewArticleComponent>;

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
      declarations: [ ViewArticleComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArticleComponent);
    component = fixture.componentInstance;
    component.article = new Article();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have remove and edit buttons', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#edit').textContent).toContain('Edit');
    expect(compiled.querySelector('#remove').textContent).toContain('Remove');
  });

  it('should hide edit and remove buttons by default', () => {
    component.loggedIn = Observable.of(false);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#edit')).toBeNull();
  });
});
