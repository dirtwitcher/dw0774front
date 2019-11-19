import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KppComponent } from './kpp.component';

describe('KppComponent', () => {
  let component: KppComponent;
  let fixture: ComponentFixture<KppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
