import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TormozaComponent } from './tormoza.component';

describe('TormozaComponent', () => {
  let component: TormozaComponent;
  let fixture: ComponentFixture<TormozaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TormozaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TormozaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
