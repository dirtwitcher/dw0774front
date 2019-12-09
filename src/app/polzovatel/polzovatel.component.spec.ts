import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolzovatelComponent } from './polzovatel.component';

describe('PolzovatelComponent', () => {
  let component: PolzovatelComponent;
  let fixture: ComponentFixture<PolzovatelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolzovatelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolzovatelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
