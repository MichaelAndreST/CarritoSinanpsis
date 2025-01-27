import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../modelo/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);
  private url: string = 'json/categorias.json';

  getCategorias(){
    return this.http.get<Categoria[]>(this.url);
  }
}
