import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compra-detail-dialog',
  templateUrl: './compra-detail-dialog.component.html',
  styleUrls: ['./compra-detail-dialog.component.css']
})
export class CompraDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CompraDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
