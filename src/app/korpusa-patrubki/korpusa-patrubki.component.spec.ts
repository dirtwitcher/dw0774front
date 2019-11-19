import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpusaPatrubkiComponent } from './korpusa-patrubki.component';

describe('KorpusaPatrubkiComponent', () => {
  let component: KorpusaPatrubkiComponent;
  let fixture: ComponentFixture<KorpusaPatrubkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorpusaPatrubkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorpusaPatrubkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
