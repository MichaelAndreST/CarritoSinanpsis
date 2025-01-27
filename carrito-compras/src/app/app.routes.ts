import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './components/catalogo/catalogo-inicio/catalogo-inicio.component';
import { CarritoListaComponent } from './components/carrito/carrito-lista/carrito-lista.component';

export const routes: Routes = [
    { path: '', component: CatalogoInicioComponent },
    { path: 'carrito', component: CarritoListaComponent},
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
