import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ArticlesService } from './articles.service';
import { AngularFireDatabase } from 'angularfire2/database';

describe('ArticlesService', () => {
  beforeEach(() => {
    const angularFireDatabaseStub = {
      list() {
        return {
          value: 'test',
          push () { }
        };
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ArticlesService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
      ]
    });
  });

  it('should be created', inject([ArticlesService], (service: ArticlesService) => {
    expect(service).toBeTruthy();
  }));

   it('should add a new article', inject([ArticlesService], (service: ArticlesService) => {
     const pushSpy = spyOn(service.getArticles(), 'push');
     const testArticle = {
       title: 'test'
     };
     service.addArticle(testArticle);
     expect(pushSpy).toHaveBeenCalled();
  }));
});