import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensiveComponent } from './intensive.component';

describe('IntensiveComponent', () => {
  let component: IntensiveComponent;
  let fixture: ComponentFixture<IntensiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntensiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
