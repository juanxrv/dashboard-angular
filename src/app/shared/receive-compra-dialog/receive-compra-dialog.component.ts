import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-receive-compra-dialog',
  templateUrl: './receive-compra-dialog.component.html',
  styleUrls: ['./receive-compra-dialog.component.css']
})
export class ReceiveCompraDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ReceiveCompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
