import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMateriaDialogComponent } from './add-materia-dialog.component';

describe('AddMateriaDialogComponent', () => {
  let component: AddMateriaDialogComponent;
  let fixture: ComponentFixture<AddMateriaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMateriaDialogComponent]
    });
    fixture = TestBed.createComponent(AddMateriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
