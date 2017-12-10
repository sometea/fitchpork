import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditArticleComponent } from './edit-article.component';
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs/Observable";
import { Article } from "./article";
import { FormsModule } from "@angular/forms";
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  const articlesServiceStub = {
    getArticle: jasmine.createSpy('getArticle'),
  };

  const paramMapStub = {
    get: jasmine.createSpy('get'),
  }

  const activatedRouteStub = {
    route: {
      paramMap: Observable.of(paramMapStub)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ EditArticleComponent ],
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
