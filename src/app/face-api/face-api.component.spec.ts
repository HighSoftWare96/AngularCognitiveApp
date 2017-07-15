import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceAPIComponent } from './face-api.component';

describe('FaceAPIComponent', () => {
  let component: FaceAPIComponent;
  let fixture: ComponentFixture<FaceAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceAPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
