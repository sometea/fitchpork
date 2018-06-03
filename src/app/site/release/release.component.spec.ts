import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ReleaseComponent } from './release.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { Article, ArticleType } from '../../admin/edit-article/article';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReleaseComponent', () => {
  let component: ReleaseComponent;
  let fixture: ComponentFixture<ReleaseComponent>;

  const testArticle: Article = {
    title: '', text: '', date: '', type: ArticleType.News, thumbnail: ''
  };

  const articlesServiceStub = {
    get: jasmine.createSpy('get').and.returnValue(Observable.of(testArticle)),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ReleaseComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ArticlesService, useValue: articlesServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
