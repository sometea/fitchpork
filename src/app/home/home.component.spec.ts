import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { HomeComponent } from './home.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { ArticlesService } from '../articles.service';
import { FormsModule } from '@angular/forms/';
import { ViewArticleComponent } from '../view-article/view-article.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const articlesServiceStub = {
    getArticles: jasmine.createSpy('getArticles').and.returnValue(Observable.of([]))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ 
        HomeComponent,
        EditArticleComponent,
        ViewArticleComponent,
      ],
      providers: [
        { provide: ArticlesService, useValue: articlesServiceStub }
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

  it('should get articles from the service', () => {
    expect(articlesServiceStub.getArticles).toHaveBeenCalled();
  })
});
