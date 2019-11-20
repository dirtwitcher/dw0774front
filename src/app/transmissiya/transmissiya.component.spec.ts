import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissiyaComponent } from './transmissiya.component';

describe('TransmissiyaComponent', () => {
  let component: TransmissiyaComponent;
  let fixture: ComponentFixture<TransmissiyaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissiyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissiyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
