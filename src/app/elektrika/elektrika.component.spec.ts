import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElektrikaComponent } from './elektrika.component';

describe('ElektrikaComponent', () => {
  let component: ElektrikaComponent;
  let fixture: ComponentFixture<ElektrikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElektrikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElektrikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
