import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, public carritoService: CarritoService) { }
  
  ngOnInit(): void {

    const ls = localStorage.getItem("carrito")
    if (ls) {
      this.carritoService.productos = JSON.parse(ls)
    }
    
    if (this.authService.isAuthenticated()) {
      this.authService.user().subscribe({
        next: (data: any) => {
          this.authService.userData = data
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
  }
}
