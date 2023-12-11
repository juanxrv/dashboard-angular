import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormControl
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMateriaDialogComponent } from '../shared/add-materia-dialog/add-materia-dialog.component';
import { AddOperacionDialogComponent } from '../shared/add-operacion-dialog/add-operacion-dialog.component';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  public materiaList: any[] = [];
  public operacionesList: any[] = [];
  public productos: any[] = [];
  public recetas: any[] = [];
  public editMode: boolean = false;
  public currentRecetaId!: number;
  public productoSeleccionado!: number;
  public error: any[] = [];
  RecetasForm: FormGroup = new FormGroup({});

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {

    this.loadProductos()
    this.loadRecetas()
  }

  loadRecetas() {
    this.apiService.getData('RecetaApi').subscribe({
      next: (data: any) => {
        this.recetas = data;
      }
    })
  }

  loadReceta(id: number) {
    this.editMode = true;
    this.apiService.getData(`RecetaApi/${id}`).subscribe({
      next: (data: any) => {
        this.currentRecetaId = id;
        this.productoSeleccionado = data.ProductoId;
        this.materiaList = data.RecetaMaterias.map((materia: any) => {
          return {
            productoId: materia.ProductoId,
            nombre: materia.Producto.Nombre,
            cantidad: materia.Cantidad,
            medida: materia.Producto.Medida,
          }
        })

        this.operacionesList = data.RecetaOperaciones.map((operacion: any) => {
          return {
            nombre: operacion.Nombre,
            descripcion: operacion.Descripcion,
          }
        })

        // console.log(this.materiaList)

      }
    })
  }

  loadProductos() {
    this.apiService.getData('ProductoApi').subscribe({
      next: (data: any) => {
        this.productos = data;
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMateriaDialogComponent, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.materiaList.find(m => m.productoId === result.productoId)) {
          this.materiaList.push(result)
        }
      }
    });
  }

  openOperacionDialog() {
    const dialogRef = this.dialog.open(AddOperacionDialogComponent, { width: "600px" });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.operacionesList.find(m => m.nombre === result.nombre)) {
          this.operacionesList.push(result)
        }
      }
    })
  }

  removeMateria(id: number) {
    this.materiaList = this.materiaList.filter(e => e.productoId !== id)
  }

  removeOperacion(id: number) {
    this.operacionesList.splice(id, 1)
  }

  submit() {
    this.apiService.postData({
      uri: 'RecetaApi',
      data: {
        productoId: this.productoSeleccionado,
        recetaMaterias: this.materiaList,
        recetaOperaciones: this.operacionesList,
      }
    }).subscribe({
      next: () => {
        this.loadRecetas()
        this.operacionesList.length = 0
        this.materiaList.length = 0
      },
      error: (err) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

  cancelEdit() {
    this.editMode = false
    this.materiaList.length = 0
    this.operacionesList.length = 0
  }

  saveChanges() {
    this.apiService.putData({
      uri: `RecetaApi/${this.currentRecetaId}`,
      data: {
        recetaMaterias: this.materiaList,
        recetaOperaciones: this.operacionesList,
      }
    }).subscribe({
      next: () => {
        this.loadRecetas()
        this.operacionesList.length = 0
        this.materiaList.length = 0
      },
      error: (err) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

}