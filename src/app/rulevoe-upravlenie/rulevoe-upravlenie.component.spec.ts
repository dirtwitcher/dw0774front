import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulevoeUpravlenieComponent } from './rulevoe-upravlenie.component';

describe('RulevoeUpravlenieComponent', () => {
  let component: RulevoeUpravlenieComponent;
  let fixture: ComponentFixture<RulevoeUpravlenieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulevoeUpravlenieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulevoeUpravlenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
