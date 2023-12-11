import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y FormControl

import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { ConfirmDeleteDialogComponent } from '../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public error: any[] = [];
  public usuarios: any[] = [];
  public editMode: boolean = false;
  public currentUsuarioId!: number;
  UsuarioForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.UsuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.loadUsuarios()
  }


  loadUsuarios() {
    this.apiService.getData('UserApi').subscribe({
      next: (data: any) => {
        this.usuarios = data;
      }
    })
  }

  loadUsuario(id: number) {
    this.editMode = true
    this.apiService.getData(`UserApi/${id}`).subscribe({
      next: (data: any) => {
        this.currentUsuarioId = id;
        this.UsuarioForm.get('nombre')?.setValue(data.Nombre)
        this.UsuarioForm.get('apellido')?.setValue(data.Apellido)
        this.UsuarioForm.get('userName')?.setValue(data.UserName)
        this.UsuarioForm.get('email')?.setValue(data.Email)
        // this.UsuarioForm.get('role')?.setValue(data.Role)
      }
    })
  }

  saveChanges() {
    if (this.UsuarioForm.get('role')?.invalid) {
      this.error.push('Selecciona un rol');
      return
    }

    this.apiService.putData({
      uri: `UserApi/${this.currentUsuarioId}`,
      data: {
        nombre: this.UsuarioForm.get('nombre')?.value,
        apellido: this.UsuarioForm.get('apellido')?.value,
        userName: this.UsuarioForm.get('userName')?.value,
        password: this.UsuarioForm.get('password')?.value,
        email: this.UsuarioForm.get('email')?.value,
        role: this.UsuarioForm.get('role')?.value
      }
    }).subscribe({
      next: () => {
        this.editMode = false
        this.loadUsuarios()
        this.UsuarioForm.reset()
        this.error.length = 0
      },
      error: (err: any) => {
        if (err.status === 400) {
          console.log('asies', err.error)
          this.error = err.error.errors
        }
      }
    })
  }

  cancelEdit() {
    this.editMode = false
    this.UsuarioForm.reset()
  }

  submit() {
    if (this.UsuarioForm.valid) {
      this.apiService.postData({
        uri: 'UserApi',
        data: {
          nombre: this.UsuarioForm.get('nombre')?.value,
          apellido: this.UsuarioForm.get('apellido')?.value,
          userName: this.UsuarioForm.get('userName')?.value,
          password: this.UsuarioForm.get('password')?.value,
          email: this.UsuarioForm.get('email')?.value,
          role: this.UsuarioForm.get('role')?.value
        }
      }).subscribe({
        next: () => {
          this.loadUsuarios()
          this.UsuarioForm.reset()
          this.error.length = 0
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
    this.apiService.deleteData({ uri: 'UserApi', id }).subscribe({
      next: () => {
        this.loadUsuarios()
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
      data: { elementName: 'este usuario' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      }
    });
  }

}
