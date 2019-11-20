import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtoplenieKondeiComponent } from './otoplenie-kondei.component';

describe('OtoplenieKondeiComponent', () => {
  let component: OtoplenieKondeiComponent;
  let fixture: ComponentFixture<OtoplenieKondeiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtoplenieKondeiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtoplenieKondeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
