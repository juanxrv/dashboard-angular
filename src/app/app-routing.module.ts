import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './Product/producto/producto.component'
import { ProveedoresComponent } from './proveedores/proveedores.component'
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component'
import { UsuarioComponent } from './usuario/usuario.component'
import { ProduccionComponent } from './produccion/produccion.component'
import { RecetasComponent } from './recetas/recetas.component'
import { LoginComponent } from './auth/login/login.component';
import { loggedGuard, isNotLogged } from './guards/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutComponent } from './about/about.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResumenPedidoComponent } from './resumen-pedido/resumen-pedido.component';
import { EtlComponent } from './etl/etl.component';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';




const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'Producto', component: ProductoComponent, canActivate: [isNotLogged] },
  { path: 'Proveedores', component: ProveedoresComponent, canActivate: [isNotLogged] },
  { path: 'Materiap', component: MateriaPrimaComponent, canActivate: [isNotLogged] },
  { path: 'Usuario', component: UsuarioComponent, canActivate: [isNotLogged] },
  { path: 'ventas', component: VentasComponent, canActivate: [isNotLogged] },
  { path: 'compras', component: ComprasComponent, canActivate: [isNotLogged] },
  { path: 'Produccion', component: ProduccionComponent, canActivate: [isNotLogged] },
  { path: 'Recetas', component: RecetasComponent, canActivate: [isNotLogged] },
  { path: 'etl', component: EtlComponent, canActivate: [isNotLogged] },
  { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
  { path: 'registro', component: SignupComponent, canActivate: [loggedGuard] },
  { path: 'detalle-producto/:id', component: ProductoDetalleComponent },
  { path: "checkout", component: CheckoutComponent, canActivate: [isNotLogged] },
  { path: "resumen-pedido", component: ResumenPedidoComponent, canActivate: [isNotLogged] },
  { path: "usuario-pedidos", component: PedidosUsuarioComponent, canActivate: [isNotLogged] },
  { path: 'about', component: AboutComponent },
  { path: "carrito", component: CarritoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
