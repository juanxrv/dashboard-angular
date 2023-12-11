import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public productos: any[] = [];
  
  constructor() { }

  add(producto: any) {
    const p = this.productos.find(e => e.productoId === producto.Id)
    if (p) {
      if (p.cantidad >= producto.Cantidad) return
      p.cantidad++
      localStorage.setItem("carrito", JSON.stringify(this.productos))
      return
    }
    this.productos.push({
      productoId: producto.Id,
      nombre: producto.Nombre,
      precio: producto.Precio,
      cantidad: 1,
    })
    localStorage.setItem("carrito", JSON.stringify(this.productos))
  }
}
