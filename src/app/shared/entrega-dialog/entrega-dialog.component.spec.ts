import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDialogComponent } from './entrega-dialog.component';

describe('EntregaDialogComponent', () => {
  let component: EntregaDialogComponent;
  let fixture: ComponentFixture<EntregaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntregaDialogComponent]
    });
    fixture = TestBed.createComponent(EntregaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
