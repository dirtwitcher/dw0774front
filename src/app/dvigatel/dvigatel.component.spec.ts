import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvigatelComponent } from './dvigatel.component';

describe('DvigatelComponent', () => {
  let component: DvigatelComponent;
  let fixture: ComponentFixture<DvigatelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvigatelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvigatelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
