import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaOhlajdeniyaComponent } from './sistema-ohlajdeniya.component';

describe('SistemaOhlajdeniyaComponent', () => {
  let component: SistemaOhlajdeniyaComponent;
  let fixture: ComponentFixture<SistemaOhlajdeniyaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaOhlajdeniyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaOhlajdeniyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
