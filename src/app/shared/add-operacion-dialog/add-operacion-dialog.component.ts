import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-operacion-dialog',
  templateUrl: './add-operacion-dialog.component.html',
  styleUrls: ['./add-operacion-dialog.component.css']
})
export class AddOperacionDialogComponent {

  nombre!: string;
  descripcion!: string;
  
  constructor(
    public dialogRef: MatDialogRef<AddOperacionDialogComponent>,
  ) {}

  submit() {
    this.dialogRef.close({
      nombre: this.nombre,
      descripcion: this.descripcion,
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
