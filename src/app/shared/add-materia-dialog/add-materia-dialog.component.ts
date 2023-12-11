import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-materia-dialog',
  templateUrl: './add-materia-dialog.component.html',
  styleUrls: ['./add-materia-dialog.component.css']
})
export class AddMateriaDialogComponent implements OnInit {

  public materias: any[] = [];
  public materia!: any;
  public cantidad!: number;

  constructor(
    public dialogRef: MatDialogRef<AddMateriaDialogComponent>,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.loadMaterias()
  }

  submit() {
    this.dialogRef.close({
      productoId: this.materia.Id,
      nombre: this.materia.Nombre,
      cantidad: this.cantidad,
      medida: this.materia.Medida,
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadMaterias() {
    this.apiService.getData('MateriaApi').subscribe({
      next: (data: any) => {
        this.materias = data;
      }
    })
  }
}
