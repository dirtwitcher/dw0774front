import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplivnayaSistemaComponent } from './toplivnaya-sistema.component';

describe('ToplivnayaSistemaComponent', () => {
  let component: ToplivnayaSistemaComponent;
  let fixture: ComponentFixture<ToplivnayaSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToplivnayaSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToplivnayaSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
