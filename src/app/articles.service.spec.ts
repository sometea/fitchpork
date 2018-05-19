import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArticlesService } from './articles.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Article } from './admin/edit-article/article';

describe('ArticlesService', () => {
  beforeEach(() => {
    const angularFireDatabaseStub = {
      list: jasmine.createSpy('list'),
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
