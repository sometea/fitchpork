import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: AngularFireAuth, useValue: {} }
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
