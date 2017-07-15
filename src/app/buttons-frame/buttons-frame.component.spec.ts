import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsFrameComponent } from './buttons-frame.component';

describe('ButtonsFrameComponent', () => {
  let component: ButtonsFrameComponent;
  let fixture: ComponentFixture<ButtonsFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
