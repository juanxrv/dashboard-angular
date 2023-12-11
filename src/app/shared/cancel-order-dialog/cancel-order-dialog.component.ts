import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.css']
})
export class CancelOrderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CancelOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
