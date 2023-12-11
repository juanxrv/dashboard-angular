import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public carrito: any[] = [];
  public total: number = 0;

  constructor(public carritoService: CarritoService) { }
  ngOnInit(): void {
    this.carrito = this.carritoService.productos.map(e => {
      return {
        producto: e.nombre,
        precio: e.precio,
        cantidad: e.cantidad,
        total: e.precio * e.cantidad
      }
    })
    
    this.total = this.carrito.reduce((sum, e) => sum + e.total, 0)
  }


}
