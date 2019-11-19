import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KuzovnieDetaliComponent } from './kuzovnie-detali.component';

describe('KuzovnieDetaliComponent', () => {
  let component: KuzovnieDetaliComponent;
  let fixture: ComponentFixture<KuzovnieDetaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KuzovnieDetaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KuzovnieDetaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
