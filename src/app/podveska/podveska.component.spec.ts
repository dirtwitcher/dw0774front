import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodveskaComponent } from './podveska.component';

describe('PodveskaComponent', () => {
  let component: PodveskaComponent;
  let fixture: ComponentFixture<PodveskaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodveskaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodveskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
