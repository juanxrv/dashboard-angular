import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add-orden-dialog',
  templateUrl: './add-orden-dialog.component.html',
  styleUrls: ['./add-orden-dialog.component.css']
})
export class AddOrdenDialogComponent implements OnInit {
  
  public productos: any[] = [];
  public producto!: any;
  public cantidad!: number;
  public error: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddOrdenDialogComponent>,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.loadProductos()
  }

  submit() {
    this.apiService.postData({
      uri: 'ProduccionApi',
      data: {
        productoId: this.producto.Id,
        cantidad: this.cantidad,
      }
    }).subscribe({
      next: () => {
        this.loadProductos()
        this.dialogRef.close()
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadProductos() {
    this.apiService.getData('ProductoApi').subscribe({
      next: (data: any) => {
        this.productos = data;
      }
    })
  }
}
