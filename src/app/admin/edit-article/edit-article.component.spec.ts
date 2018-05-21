import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditArticleComponent } from './edit-article.component';
import { AuthenticationService } from '../../authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Article, ArticleType } from './article';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from '../../articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MarkdownModule } from 'ngx-md';

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  const testArticle: Article = {
    title: '', text: '', date: '', type: ArticleType.News
  };

  const articlesServiceStub = {
    get: jasmine.createSpy('get').and.returnValue(Observable.of(testArticle)),
  };

  const paramMapStub = {
    get: jasmine.createSpy('get').and.returnValue(''),
  };

  const activatedRouteStub = {
      paramMap: Observable.of(paramMapStub),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MarkdownModule ],
      declarations: [ EditArticleComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ArticlesService, useValue: articlesServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
