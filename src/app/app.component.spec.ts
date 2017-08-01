import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ArticlesService } from './articles.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { EditArticleComponent } from './edit-article/edit-article.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const authenticationServiceStub = {
      getAuthState() {
        return Observable.of({ uid: '1' });
      },
      login() { },
      logout() { }
    };

    const articlesServiceStub = {
      getArticles () {
        return Observable.of([]);
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EditArticleComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ArticlesService, useValue: articlesServiceStub },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render the user id', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#userid').textContent).toContain('User ID: 1');
  }));
});
