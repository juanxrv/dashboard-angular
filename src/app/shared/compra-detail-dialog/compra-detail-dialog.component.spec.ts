import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDetailDialogComponent } from './compra-detail-dialog.component';

describe('CompraDetailDialogComponent', () => {
  let component: CompraDetailDialogComponent;
  let fixture: ComponentFixture<CompraDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraDetailDialogComponent]
    });
    fixture = TestBed.createComponent(CompraDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
