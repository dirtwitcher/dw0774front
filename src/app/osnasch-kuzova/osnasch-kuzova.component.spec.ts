import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnaschKuzovaComponent } from './osnasch-kuzova.component';

describe('OsnaschKuzovaComponent', () => {
  let component: OsnaschKuzovaComponent;
  let fixture: ComponentFixture<OsnaschKuzovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsnaschKuzovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnaschKuzovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
