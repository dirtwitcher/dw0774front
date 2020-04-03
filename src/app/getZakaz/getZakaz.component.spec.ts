import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetZakazComponent } from './getZakaz.component';

describe('GetZakazComponent', () => {
  let component: GetZakazComponent;
  let fixture: ComponentFixture<GetZakazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetZakazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetZakazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
