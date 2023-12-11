import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelaVentaDialogComponent } from './cancela-venta-dialog.component';

describe('CancelaVentaDialogComponent', () => {
  let component: CancelaVentaDialogComponent;
  let fixture: ComponentFixture<CancelaVentaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelaVentaDialogComponent]
    });
    fixture = TestBed.createComponent(CancelaVentaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
