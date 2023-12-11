import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCompraDialogComponent } from './receive-compra-dialog.component';

describe('ReceiveCompraDialogComponent', () => {
  let component: ReceiveCompraDialogComponent;
  let fixture: ComponentFixture<ReceiveCompraDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiveCompraDialogComponent]
    });
    fixture = TestBed.createComponent(ReceiveCompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
