import { TestBed, inject } from '@angular/core/testing';

import { EmotionServiceService } from './emotion-service.service';

describe('EmotionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmotionServiceService]
    });
  });

  it('should be created', inject([EmotionServiceService], (service: EmotionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
