import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductoDialogComponent } from '../shared/add-producto-dialog/add-producto-dialog.component';
import { CancelCompraDialogComponent } from '../shared/cancel-compra-dialog/cancel-compra-dialog.component';
import { ReceiveCompraDialogComponent } from '../shared/receive-compra-dialog/receive-compra-dialog.component';
import { CompraDetailDialogComponent } from '../shared/compra-detail-dialog/compra-detail-dialog.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public compras: any[] = [];
  public proveedores: any[] = [];
  public proveedorId!: number;
  public materiaList: any[] = [];
  public error: any[] = [];

  constructor(private apiService: ApiService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProveedores()
    this.loadCompras()
  }

  loadCompras() {
    this.apiService.getData('CompraApi').subscribe({
      next: (data: any) => {
        this.compras = data;
      }
    })
  }

  loadProveedores() {
    this.apiService.getData('ProveedorApi').subscribe({
      next: (data: any) => {
        this.proveedores = data
      }
    })
  }

  openAddProductoDialog() {
    const dialogRef = this.matDialog.open(AddProductoDialogComponent, {
      width: "600px",
      data: { proveedorId: this.proveedorId }
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (!this.materiaList.find(e => e.productoId === data.productoId)) {
          this.materiaList.push(data)
        }
      }
    })
  }

  submit() {
    const submitMateria = this.materiaList.map(materia => {
      return {
        productoId: materia.productoId,
        cantidad: materia.cantidad
      }
    })
    this.apiService.postData({
      uri: 'CompraApi',
      data: {
        proveedorId: this.proveedorId,
        compraProductos: submitMateria,
      }
    }).subscribe({
      next: () => {
        this.loadCompras()
        this.materiaList.length = 0
      },
      error: (err: any) => {
        this.error = err.error.errors
      }
    })
  }

  cancelar(id: number) {
    this.apiService.putData({
      uri: `CompraApi/cancelar/${id}`
    }).subscribe({
      next: () => {
        this.materiaList.length = 0
        this.loadCompras()
      },
      error: (err) => {
        if (err.status === 400) {
          this.error.push = err.error.errors
        }
      }
    })
  }

  recibir(id: number) {
    this.apiService.putData({
      uri: `CompraApi/recibir/${id}`
    }).subscribe({
      next: () => {
        this.materiaList.length = 0
        this.loadCompras()
      },
      error: (err) => {
        if (err.status === 400) {
          this.error.push = err.error.errors
        }
      }
    })
  }

  openReciveDialog(compra: any) {
    const dialogRef = this.matDialog.open(ReceiveCompraDialogComponent, {
      width: "600px",
      data: { nombre: compra.Proveedor.Nombre },
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.recibir(compra.Id)
        this.loadCompras()
      }
    })
  }

  openDetailDialog(compra: any) {
    this.matDialog.open(CompraDetailDialogComponent, {
      width: "600px",
      data: { nombre: compra.Proveedor.Nombre, productos: compra.CompraProductos },
    })
  }

  openCancelDialog(compra: any) {
    const dialogRef = this.matDialog.open(CancelCompraDialogComponent, {
      width: "600px",
      data: { nombre: compra.Proveedor.Nombre },
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.cancelar(compra.Id)
        this.loadCompras()
      }
    })
  }

  removeMateria(id: number) {
    this.materiaList = this.materiaList.filter(e => e.id !== id)
  }

}
