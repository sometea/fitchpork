import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArticlesService } from './articles.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Article } from './edit-article/article';

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
});
