import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostZakazComponent } from './postZakaz.component';

describe('PostZakazComponent', () => {
  let component: PostZakazComponent;
  let fixture: ComponentFixture<PostZakazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostZakazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostZakazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
