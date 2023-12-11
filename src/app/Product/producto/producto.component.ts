import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormControl

import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { ConfirmDeleteDialogComponent } from '../../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public error: any[] = [];
  public productos: any[] = [];
  // public proveedores: any[] = [];
  public editMode: boolean = false;
  public currentProductoId!: number;
  public imagenSeleccionada!: any;
  productoForm: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [null, Validators.required],
      precio: [null, Validators.required],
      costo: [null, Validators.required],
      medida: ['pieza', Validators.required],
      // proveedor: [null, Validators.required],
    });

    this.loadProductos()
    // this.loadProveedores()
  }


  loadProductos() {
    this.apiService.getData('ProductoApi').subscribe({
      next: (data: any) => {
        this.productos = data;
      }
    })
  }

  // loadProveedores() {
  //   this.apiService.getData('ProveedorApi').subscribe({
  //     next: (data: any) => {
  //       this.proveedores = data;
  //     }
  //   })
  // }

  loadProducto(id: number) {
    this.editMode = true
    this.apiService.getData(`ProductoApi/${id}`).subscribe({
      next: (data: any) => {

        this.currentProductoId = id;
        this.productoForm.get('nombre')?.setValue(data.Nombre)
        this.productoForm.get('descripcion')?.setValue(data.Descripcion)
        this.productoForm.get('cantidad')?.setValue(data.Cantidad)
        this.productoForm.get('precio')?.setValue(data.Precio)
        this.productoForm.get('costo')?.setValue(data.Costo)
        this.productoForm.get('medida')?.setValue(data.Medida)
        // this.productoForm.get('proveedor')?.setValue(data.ProveedorId)
        this.imagenSeleccionada = data.Imagen
      }
    })
  }

  saveChanges() {
    const data: any = {
      nombre: this.productoForm.get('nombre')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
      precio: this.productoForm.get('precio')?.value,
      costo: this.productoForm.get('costo')?.value,
      medida: this.productoForm.get('medida')?.value,
      // proveedorId: this.productoForm.get('proveedor')?.value,
    }
    this.imagenSeleccionada && (data['imagen'] = this.imagenSeleccionada)
    this.apiService.putData({
      uri: `ProductoApi/${this.currentProductoId}`,
      data
    }).subscribe({
      next: (res) => {
        console.log(res)
        this.editMode = false
        this.loadProductos()
        this.productoForm.reset()
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
    this.productoForm.reset()
    this.imagenSeleccionada = null
    this.error.length = 0
  }

  submit() {
    console.log(this.imagenSeleccionada)
    if (this.productoForm.invalid) {
      if (!this.imagenSeleccionada) {
        this.error.push('Asegúrate de llenar todos los campos')
      }
      return
    }
    // if (this.productoForm.valid) {
    this.apiService.postData({
      uri: 'ProductoApi',
      data: {
        nombre: this.productoForm.get('nombre')?.value,
        descripcion: this.productoForm.get('descripcion')?.value,
        precio: this.productoForm.get('precio')?.value,
        costo: this.productoForm.get('costo')?.value,
        cantidad: this.productoForm.get('cantidad')?.value,
        medida: this.productoForm.get('medida')?.value,
        // proveedorId: this.productoForm.get('proveedor')?.value,
        imagen: this.imagenSeleccionada,
      }
    }).subscribe({
      next: () => {
        this.loadProductos()
        this.productoForm.reset()
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
    this.apiService.deleteData({ uri: 'ProductoApi', id }).subscribe({
      next: () => {
        this.loadProductos()
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
      data: { elementName: 'este producto' },
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
