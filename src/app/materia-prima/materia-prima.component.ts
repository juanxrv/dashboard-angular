import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormControl

import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { ConfirmDeleteDialogComponent } from '../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  public error: any[] = [];
  public materias: any[] = [];
  public proveedores: any[] = [];
  public editMode: boolean = false;
  public currentProductoId!: number;
  public imagenSeleccionada!: any;
  MateriaPForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.MateriaPForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [null, Validators.required], 
      precio: [null, Validators.required],
      costo: [null, Validators.required], 
      medida: ['', Validators.required],
      proveedor: [null, Validators.required],
    });

    this.loadMaterias()
    this.loadProveedores()
  }

  
  loadMaterias() {
    this.apiService.getData('MateriaApi').subscribe({
      next: (data: any) => {
        this.materias = data;
      }
    })
  }

  loadProveedores() {
    this.apiService.getData('ProveedorApi').subscribe({
      next: (data: any) => {
        this.proveedores = data;
      }
    })
  }

  loadProducto(id: number) {
    this.editMode = true
    this.apiService.getData(`MateriaApi/${id}`).subscribe({
      next: (data: any) => {

        this.currentProductoId = id;
        this.MateriaPForm.get('nombre')?.setValue(data.Nombre)
        this.MateriaPForm.get('descripcion')?.setValue(data.Descripcion)
        this.MateriaPForm.get('cantidad')?.setValue(data.Cantidad)
        this.MateriaPForm.get('precio')?.setValue(data.Precio)
        this.MateriaPForm.get('costo')?.setValue(data.Costo)
        this.MateriaPForm.get('medida')?.setValue(data.Medida)
        this.MateriaPForm.get('proveedor')?.setValue(data.ProveedorId)
        this.imagenSeleccionada = data.Imagen
      }
    })
  }

  saveChanges() {
    const data: any = {
      nombre: this.MateriaPForm.get('nombre')?.value,
      descripcion: this.MateriaPForm.get('descripcion')?.value,
      cantidad: this.MateriaPForm.get('cantidad')?.value,
      precio: this.MateriaPForm.get('precio')?.value,
      costo: this.MateriaPForm.get('costo')?.value,
      medida: this.MateriaPForm.get('medida')?.value,
      proveedorId: this.MateriaPForm.get('proveedor')?.value,
    }
    this.imagenSeleccionada && (data['imagen'] = this.imagenSeleccionada)
    this.apiService.putData({
      uri: `MateriaApi/${this.currentProductoId}`,
      data
    }).subscribe({
      next: (res) => {
        console.log(res)
        this.editMode = false
        this.loadMaterias()
        this.MateriaPForm.reset()
        this.imagenSeleccionada = null
        this.error.length = 0
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
    this.MateriaPForm.reset()
    this.imagenSeleccionada = null
    this.error.length = 0
  }

  submit() {
    console.log(this.imagenSeleccionada)
    if (this.MateriaPForm.invalid) {
      if (!this.imagenSeleccionada) {
        this.error.push('Asegúrate de llenar todos los campos')
      }
      return
    }
    // if (this.MateriaPForm.valid) {
      this.apiService.postData({
        uri: 'MateriaApi',
        data: {
          nombre: this.MateriaPForm.get('nombre')?.value,
          descripcion: this.MateriaPForm.get('descripcion')?.value,
          precio: this.MateriaPForm.get('precio')?.value,
          costo: this.MateriaPForm.get('costo')?.value,
          cantidad: this.MateriaPForm.get('cantidad')?.value,
          medida: this.MateriaPForm.get('medida')?.value,
          proveedorId: this.MateriaPForm.get('proveedor')?.value,
          imagen: this.imagenSeleccionada,
        }
      }).subscribe({
        next: () => {
          this.loadMaterias()
          this.MateriaPForm.reset()
          this.imagenSeleccionada = null
          this.error.length = 0
        },
        error: (err: any) => {
          if (err.status === 400) {
            this.error = err.error.errors
          }
        }
      })
    // }
  }

  delete(id: number) {
    this.apiService.deleteData({ uri: 'MateriaApi', id }).subscribe({
      next: () => {
        this.loadMaterias()
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
      data: { elementName: 'esta materia' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      }
    });
  }

  async uploadImage(img: any) {
    console.log(img.target.files[0])
    this.imagenSeleccionada = await this.getBase64(img.target.files[0])
  }

  getBase64(img: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

}