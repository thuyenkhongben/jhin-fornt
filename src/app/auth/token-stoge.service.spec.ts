import { TestBed } from '@angular/core/testing';

import { TokenStogeService } from './token-stoge.service';

describe('TokenStogeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenStogeService = TestBed.get(TokenStogeService);
    expect(service).toBeTruthy();
  });
});
