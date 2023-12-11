import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entrega-dialog',
  templateUrl: './entrega-dialog.component.html',
  styleUrls: ['./entrega-dialog.component.css']
})
export class EntregaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EntregaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
