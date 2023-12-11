import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-cancela-venta-dialog',
  templateUrl: './cancela-venta-dialog.component.html',
  styleUrls: ['./cancela-venta-dialog.component.css']
})
export class CancelaVentaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelaVentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
