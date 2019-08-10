import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComicComponent } from './detalle-comic.component';

describe('DetalleComicComponent', () => {
  let component: DetalleComicComponent;
  let fixture: ComponentFixture<DetalleComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
