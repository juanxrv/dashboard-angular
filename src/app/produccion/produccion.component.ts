import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormControl
import { MatDialog } from '@angular/material/dialog';
import { AddOrdenDialogComponent } from '../shared/add-orden-dialog/add-orden-dialog.component';
import { ApiService } from '../services/api.service';
import { CancelOrderDialogComponent } from '../shared/cancel-order-dialog/cancel-order-dialog.component';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  public ordenes: any[] = [];
  public operacionesList: any[] = [];
  public error: any[] = [];
  public minDate: Date = new Date();
  public currentOrdenId!: (number | null);
  ProduccionForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {
    this.loadOrdenes()
  }

  loadOrdenes() {
    this.apiService.getData('ProduccionApi').subscribe({
      next: (data) => {
        this.ordenes = data;
        console.log(this.ordenes)
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

  openOrdenDialog() {
    const dialogRef = this.dialog.open(AddOrdenDialogComponent, { width: '600px' })

    dialogRef.afterClosed().subscribe(() => {
      this.loadOrdenes()
    })
  }

  openCancelOrderDialog(data: any) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      width: "600px", data
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        this.cancelOrder(data.id)
      }
    })
  }

  cancelOrder(id: number) {
    this.apiService.putData({
      uri: `ProduccionApi/${id}/cancelar`
    }).subscribe({
      next: () => {
        this.resetValues()
        this.loadOrdenes()
      },
      error: (err: any) => {
        if (err.status === 400) {
          if (typeof err.error.errors.length === 'undefined') {
            this.error.push({ ErrorMessage: 'Ocurrió un error desconocido' })
            return
          }
          this.error = err.error.errors
        }
      }
    })
  }

  loadOrden(id: number) {
    this.apiService.getData(`ProduccionApi/${id}`).subscribe({
      next: (data: any) => {
        this.currentOrdenId = id
        this.operacionesList = data.ProduccionOperaciones
      }
    })
  }

  setFecha(fecha: string, id: number, e: any) {
    this.operacionesList.find(op => op.Id === id)[fecha] = new Date(e.target.value).toISOString()
  }

  submit() {
    if(!this.operacionesList.length) {
      this.error.push({ ErrorMessage: 'No puedes procesar una orden sin operaciones'})
      return
    }
    this.operacionesList = this.operacionesList.map(op => {
      return {
        operacionId: op.Id,
        fechaInicio: op.FechaInicio,
        fechaFin: op.FechaFin,
      }
    })
    this.apiService.putData({
      uri: `ProduccionApi/${this.currentOrdenId}`,
      data: {
        operaciones: this.operacionesList,
      }
    }).subscribe({
      next: (data: any) => {
        this.loadOrdenes()
        this.resetValues()
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

  resetValues() {
    this.currentOrdenId = null
    this.operacionesList.length = 0
  }
}