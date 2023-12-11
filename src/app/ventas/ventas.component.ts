import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EntregaDialogComponent } from '../shared/entrega-dialog/entrega-dialog.component';
import { CancelaVentaDialogComponent } from '../shared/cancela-venta-dialog/cancela-venta-dialog.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public ventas: any[] = [];

  constructor(private apiService: ApiService, public matDialog: MatDialog) { }
  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas() {
    this.apiService.getData('VentaApi').subscribe({
      next: (data: any) => {
        this.ventas = data;
      }
    })
  }

  openEntregarDialog(pedido: any) {
    const dialogRef = this.matDialog.open(EntregaDialogComponent, {
      width: '600px',
      data: {
        id: pedido.Id
      }
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.entregar(pedido.Id)
      }
    })
  }

  entregar(id: number) {
    console.log(id);
    this.apiService.postData({
      uri: `VentaApi/entregar/${id}`
    }).subscribe({
      next: (data: any) => {
        this.loadVentas()
      }
    })
  }

  openCancelarDialog(pedido: any) {
    const dialogRef = this.matDialog.open(CancelaVentaDialogComponent, {
      width: '600px',
      data: {
        id: pedido.Id
      }
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.cancela(pedido.Id)
      }
    })
  }

  cancela(id: number) {
    this.apiService.postData({
      uri: `VentaApi/cancelar/${id}`
    }).subscribe({
      next: (data: any) => {
        this.loadVentas()
      }
    })
  }


}
