import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  badgevisible = false;
  public productos: any[] = [];

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.loadProductos()
  }
  
  loadProductos() {
    this.apiService.getData('ProductoApi').subscribe({
      next: (data: any) => {
        this.productos = data;      
        console.log(this.productos)
      }
    })
  }

  badgevisibility() {
    this.badgevisible = true;
  }
}
