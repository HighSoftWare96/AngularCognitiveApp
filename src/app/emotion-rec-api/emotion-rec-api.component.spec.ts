import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionRecAPIComponent } from './emotion-rec-api.component';

describe('EmotionRecAPIComponent', () => {
  let component: EmotionRecAPIComponent;
  let fixture: ComponentFixture<EmotionRecAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionRecAPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionRecAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
