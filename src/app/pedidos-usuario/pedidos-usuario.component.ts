import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pedidos-usuario',
  templateUrl: './pedidos-usuario.component.html',
  styleUrls: ['./pedidos-usuario.component.css']
})
export class PedidosUsuarioComponent implements OnInit {

  pedidos: any[] = [];

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.loadPedidos()
  }

  loadPedidos() {
    this.apiService.getData('PedidoApi/user').subscribe({
      next: (data: any) => {
        this.pedidos = data;
        console.log(this.pedidos);
        
      }
    })
  }


}
