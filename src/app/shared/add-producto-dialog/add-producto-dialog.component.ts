import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add-producto-dialog',
  templateUrl: './add-producto-dialog.component.html',
  styleUrls: ['./add-producto-dialog.component.css']
})
export class AddProductoDialogComponent implements OnInit {
  
  public productos: any[] = [];
  public producto!: any;
  public cantidad!: number;

  constructor(
    public dialogRef: MatDialogRef<AddProductoDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  ngOnInit(): void {
    this.loadProductos()
  }

  submit() {
    this.dialogRef.close({
      productoId: this.producto.Id,
      nombre: this.producto.Nombre,
      cantidad: this.cantidad,
      medida: this.producto.Medida,
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  loadProductos() {
    this.apiService.getData('MateriaApi').subscribe({
      next: (data: any) => {
        this.productos = data.filter((e: any) => e.ProveedorId === this.data.proveedorId)
      }
    })
  }
}
