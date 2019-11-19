import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolesaDiskiComponent } from './kolesa-diski.component';

describe('KolesaDiskiComponent', () => {
  let component: KolesaDiskiComponent;
  let fixture: ComponentFixture<KolesaDiskiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolesaDiskiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolesaDiskiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
