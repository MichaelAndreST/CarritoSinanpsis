import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './components/catalogo/catalogo-inicio/catalogo-inicio.component';
import { CarritoListaComponent } from './components/carrito/carrito-lista/carrito-lista.component';
import { ProductoDetalleComponent } from './components/producto/producto-detalle/producto-detalle.component';

export const routes: Routes = [
    { path: '', component: CatalogoInicioComponent },
    { path: 'carrito', component: CarritoListaComponent},
    { path: 'producto/:id', component: ProductoDetalleComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
