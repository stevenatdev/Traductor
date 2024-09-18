import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeccionesPage } from './lecciones.page';

describe('LeccionesPage', () => {
  let component: LeccionesPage;
  let fixture: ComponentFixture<LeccionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
