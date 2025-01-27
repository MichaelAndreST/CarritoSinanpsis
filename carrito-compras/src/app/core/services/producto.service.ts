import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../modelo/producto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private url: string = 'json/productos.json';

  getProductos(){
    return this.http.get<Producto[]>(this.url);
  }

  getProductoXId(id: number) {
    return this.http.get<Producto[]>(this.url).pipe(
      map((productos) => productos.find((producto) => producto.id === id))
    );
  }

}
