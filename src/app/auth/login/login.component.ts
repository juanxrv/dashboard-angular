import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username!: string;
  public password!: string;
  public error!: string;

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (data: any) => {
        this.authService.setToken(data.jwt)
        this.authService.user().subscribe({
          next: (data: User) => {
            this.authService.userData = data
          }
        })
        this.router.navigate(['']);
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.error = 'Las credenciales son incorrectas.'
        }
        if (error.status === 500) {
          this.error = 'Ocurrió en error en el servidor.'
        }
      }
    })
  }
}
