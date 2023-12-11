import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(public authService: AuthService, private router: Router, public carritoService: CarritoService) {}

  logout() {
    this.authService.logout().then(() => {
      this.authService.userData = null
      this.carritoService.productos.length = 0
      this.router.navigate([""]);
    })
  }


}
