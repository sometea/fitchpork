import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { HomeComponent } from './home.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { ArticlesService } from '../articles.service';
import { FormsModule } from '@angular/forms/';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    const articlesServiceStub = {
      getArticles () {
        return Observable.of([]);
      }
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ 
        HomeComponent,
        EditArticleComponent,
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
});
