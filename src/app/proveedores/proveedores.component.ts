import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormControl

import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { ConfirmDeleteDialogComponent } from '../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public error: any[] = [];
  public proveedores: any[] = [];
  public editMode: boolean = false;
  public currentProveedorId!: number;
  proveedoresForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.proveedoresForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: [null, [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
    });
    this.loadProveedores()
  }

  loadProveedores() {
    this.apiService.getData('ProveedorApi').subscribe({
      next: (data: any) => {
        this.proveedores = data;
      }
    })
  }

  loadProveedor(id: number) {
    this.editMode = true
    this.apiService.getData(`ProveedorApi/${id}`).subscribe({
      next: (data: any) => {
        this.currentProveedorId = id;
        this.proveedoresForm.get('nombre')?.setValue(data.Nombre)
        this.proveedoresForm.get('direccion')?.setValue(data.Direccion)
        this.proveedoresForm.get('telefono')?.setValue(data.Telefono)
        this.proveedoresForm.get('correo')?.setValue(data.Correo)
      }
    })
  }

  saveChanges() {
    this.apiService.putData({
      uri: `ProveedorApi/${this.currentProveedorId}`,
      data: {
        nombre: this.proveedoresForm.get('nombre')?.value,
        direccion: this.proveedoresForm.get('direccion')?.value,
        telefono: this.proveedoresForm.get('telefono')?.value,
        correo: this.proveedoresForm.get('correo')?.value
      }
    }).subscribe({
      next: () => {
        this.editMode = false
        this.loadProveedores()
        this.proveedoresForm.reset()
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

  cancelEdit() {
    this.editMode = false
    this.proveedoresForm.reset()
  }

  submit() {
    if (this.proveedoresForm.valid) {
      this.apiService.postData({
        uri: 'ProveedorApi',
        data: {
          nombre: this.proveedoresForm.get('nombre')?.value,
          direccion: this.proveedoresForm.get('direccion')?.value,
          telefono: this.proveedoresForm.get('telefono')?.value,
          correo: this.proveedoresForm.get('correo')?.value
        }
      }).subscribe({
        next: () => {
          this.loadProveedores()
          this.proveedoresForm.reset()
        },
        error: (err: any) => {
          if (err.status === 400) {
            this.error = err.error.errors
          }
        }
      })
    }
  }

  delete(id: number) {
    this.apiService.deleteData({uri: 'ProveedorApi', id}).subscribe({
      next: () => {
        this.loadProveedores()
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.error = err.error.errors
        }
      }
    })
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { elementName: 'este proveedor' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      }
    });
  }

}
