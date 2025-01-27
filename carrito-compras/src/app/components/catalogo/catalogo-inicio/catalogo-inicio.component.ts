import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/modelo/producto';

@Component({
  selector: 'app-catalogo-inicio',
  imports: [],
  templateUrl: './catalogo-inicio.component.html',
  styleUrl: './catalogo-inicio.component.scss'
})
export class CatalogoInicioComponent implements OnInit {
  private productoService = inject(ProductoService);
  productos: Producto[] = [];


  ngOnInit(): void {
      this.getProducto();
  }

  getProducto(){
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log(data);
      }, error: (e) => {
        console.error(e);
      }
    });
  }
}
