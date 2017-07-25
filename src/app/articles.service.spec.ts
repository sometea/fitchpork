import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ArticlesService } from './articles.service';
import { AngularFireDatabase } from 'angularfire2/database';

describe('ArticlesService', () => {
  beforeEach(() => {
    const angularFireDatabaseStub = {
      list() {
        return {
          push() {
          }
        }
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

  it('should get some articles from firebase', inject([ArticlesService], (service: ArticlesService) => {
    const listSpy = spyOn(service.af, 'list');
    service.getArticles();
    expect(listSpy).toHaveBeenCalled();
  }));

   it('should add a new article', inject([ArticlesService], (service: ArticlesService) => {
     const listStub = {
        push (article) {}
     };
     const listSpy = spyOn(service.af, 'list').and.returnValue(listStub);
     const pushSpy = spyOn(listStub, 'push');
     const testArticle = {
       title: 'test'
     };
     service.addArticle(testArticle);
     expect(pushSpy).toHaveBeenCalled();
  }));
});
