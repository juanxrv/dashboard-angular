import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  public producto: any;
  public error: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private carritoService: CarritoService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadProducto(params.get('id'))
    });
  }

  addToCart(producto: any) {
    this.carritoService.add(producto)
  }

  loadProducto(id: any) {
    this.apiService.getData(`ProductoApi/${id}`).subscribe({
      next: (data: any) => {
        this.producto = data;
      }
    })
  }
}
