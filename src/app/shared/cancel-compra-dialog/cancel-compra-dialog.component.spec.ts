import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCompraDialogComponent } from './cancel-compra-dialog.component';

describe('CancelCompraDialogComponent', () => {
  let component: CancelCompraDialogComponent;
  let fixture: ComponentFixture<CancelCompraDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelCompraDialogComponent]
    });
    fixture = TestBed.createComponent(CancelCompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
