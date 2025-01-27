import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-inicio',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-inicio.component.html',
  styleUrl: './catalogo-inicio.component.scss'
})
export class CatalogoInicioComponent implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

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

  agregarProducto(item: Producto){
    this.carritoService.agregarProducto(item);
  }
}
