import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesComponent } from './list-articles.component';
import { ArticlesService } from '../articles.service';
import { Observable } from 'rxjs';

describe('ListArticlesComponent', () => {
  let component: ListArticlesComponent;
  let fixture: ComponentFixture<ListArticlesComponent>;

  const articlesServiceStub = {
    getArticles: jasmine.createSpy('getArticles').and.returnValue(Observable.of([]))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticlesComponent ],
      providers: [
        { provide: ArticlesService, useValue: articlesServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
