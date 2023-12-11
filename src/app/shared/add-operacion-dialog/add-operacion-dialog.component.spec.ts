import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperacionDialogComponent } from './add-operacion-dialog.component';

describe('AddOperacionDialogComponent', () => {
  let component: AddOperacionDialogComponent;
  let fixture: ComponentFixture<AddOperacionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOperacionDialogComponent]
    });
    fixture = TestBed.createComponent(AddOperacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
