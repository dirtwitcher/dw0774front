import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsvetPriboryComponent } from './osvet-pribory.component';

describe('OsvetPriboryComponent', () => {
  let component: OsvetPriboryComponent;
  let fixture: ComponentFixture<OsvetPriboryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsvetPriboryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsvetPriboryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
