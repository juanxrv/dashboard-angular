import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public error: any[] = [];

  public calle = null;
  public numero = null;
  public colonia = null;
  public ciudad = null;
  public estado = null;
  public cpostal = null;

  constructor(private apiService: ApiService, public carritoService: CarritoService, private router: Router) { }

  submit() {

    if (!this.calle || !this.numero || !this.colonia || !this.ciudad || !this.estado || !this.cpostal) {
      this.error.length = 0
      this.error.push({ ErrorMessage: "Asegúrate de llenar todos los campos" });
      return
    }

    const productos = this.carritoService.productos.map(e => {
      return {
        productoId: e.productoId,
        cantidad: e.cantidad
      }
    });
    this.apiService.postData({
      uri: 'PedidoApi',
      data: {
        calle: this.calle,
        numero: this.numero,
        colonia: this.colonia,
        ciudad: this.ciudad,
        estado: this.estado,
        codigoPostal: this.cpostal,
        pais: 'México',
        productos
      }
    }).subscribe({
      next: (data) => {
        this.router.navigate(["resumen-pedido"])
      }
    })
  }
}
