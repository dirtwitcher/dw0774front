import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaModelComponent } from './marka-model.component';

describe('MarkaModelComponent', () => {
  let component: MarkaModelComponent;
  let fixture: ComponentFixture<MarkaModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkaModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkaModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
