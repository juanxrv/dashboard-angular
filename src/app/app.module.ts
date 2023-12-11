import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'

import { InicioComponent } from './inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; // Importa el módulo MatCardModule
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductoComponent } from './Product/producto/producto.component';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { RecetasComponent } from './recetas/recetas.component';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AboutComponent } from './about/about.component';
import { ConfirmDeleteDialogComponent } from './shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddMateriaDialogComponent } from './shared/add-materia-dialog/add-materia-dialog.component';
import { AddOperacionDialogComponent } from './shared/add-operacion-dialog/add-operacion-dialog.component';
import { AddOrdenDialogComponent } from './shared/add-orden-dialog/add-orden-dialog.component';
import { CancelOrderDialogComponent } from './shared/cancel-order-dialog/cancel-order-dialog.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { AddProductoDialogComponent } from './shared/add-producto-dialog/add-producto-dialog.component';
import { CancelCompraDialogComponent } from './shared/cancel-compra-dialog/cancel-compra-dialog.component';
import { ReceiveCompraDialogComponent } from './shared/receive-compra-dialog/receive-compra-dialog.component';
import { CompraDetailDialogComponent } from './shared/compra-detail-dialog/compra-detail-dialog.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResumenPedidoComponent } from './resumen-pedido/resumen-pedido.component';
import { EtlComponent } from './etl/etl.component';
import { EntregaDialogComponent } from './shared/entrega-dialog/entrega-dialog.component';
import { CancelaVentaDialogComponent } from './shared/cancela-venta-dialog/cancela-venta-dialog.component';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductoComponent,
    MenuComponent,
    ProveedoresComponent,
    MateriaPrimaComponent,
    UsuarioComponent,
    ProduccionComponent,
    RecetasComponent,
    AboutComponent,
    ConfirmDeleteDialogComponent,
    AddMateriaDialogComponent,
    AddOperacionDialogComponent,
    AddOrdenDialogComponent,
    CancelOrderDialogComponent,
    ComprasComponent,
    VentasComponent,
    AddProductoDialogComponent,
    CancelCompraDialogComponent,
    ReceiveCompraDialogComponent,
    CompraDetailDialogComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    CheckoutComponent,
    ResumenPedidoComponent,
    EtlComponent,
    EntregaDialogComponent,
    CancelaVentaDialogComponent,
    PedidosUsuarioComponent,
  ],
  imports: [

    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    // //Para formularios
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,

    AuthModule,




    // MatCarouselModule.forRoot() // Importar el módulo del carrusel en los imports




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
