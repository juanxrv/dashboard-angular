import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public nombre!: string;
  public apellido!: string;
  public userName!: string;
  public password!: string;
  public password_confirmation!: string;
  public email!: string;
  public error: any = []

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.password !== this.password_confirmation) {
      this.error.push('Las contraseñas no coinciden.')
      return
    }
    this.authService.signup({
      nombre: this.nombre,
      apellido: this.apellido,
      userName: this.userName,
      password: this.password,
      email: this.email,
      role: 'Cliente',
    }).subscribe({
      next: (data: any) => {
        this.authService.setToken(data.jwt);
        localStorage.setItem("token", data.jwt);
        this.router.navigate(['']);
      },
      error: (err: any) => {
        if (err.status === 400) {
          this.error = err.error
        } 
      }
    })
  }
}
