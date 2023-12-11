import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css']
})
export class ResumenPedidoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.loadPedido(params.get('id'))
    // });
    this.loadPedido()
    
  }

  loadPedido() {
    // this.apiService.getData(`PedidoApi/${id}`).subscribe({
    //   next: (data: any) => {
    //     console.log(data)
    //   }
    // })
    this.apiService.getData(`PedidoApi`).subscribe({
      next: (data: any) => {
        console.log(data)
      }
    })
  }
}