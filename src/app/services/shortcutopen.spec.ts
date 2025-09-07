import { TestBed } from '@angular/core/testing';

import { Shortcutopen } from './shortcutopen';

describe('Shortcutopen', () => {
  let service: Shortcutopen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shortcutopen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
