import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DopTovariComponent } from './dop-tovari.component';

describe('DopTovariComponent', () => {
  let component: DopTovariComponent;
  let fixture: ComponentFixture<DopTovariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DopTovariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DopTovariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
