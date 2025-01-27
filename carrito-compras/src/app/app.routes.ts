import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './components/catalogo/catalogo-inicio/catalogo-inicio.component';

export const routes: Routes = [
    { path: '', component: CatalogoInicioComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
