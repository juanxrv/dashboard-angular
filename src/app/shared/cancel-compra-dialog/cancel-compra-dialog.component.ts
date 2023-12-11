import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-compra-dialog',
  templateUrl: './cancel-compra-dialog.component.html',
  styleUrls: ['./cancel-compra-dialog.component.css']
})
export class CancelCompraDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CancelCompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
