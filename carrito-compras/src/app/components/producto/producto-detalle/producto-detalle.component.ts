import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../core/modelo/producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {
  private productoService = inject(ProductoService);
  producto!: Producto;
  cantidad: number = 1;

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {
    const productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductoXId(productoId);
  }

  ngOnInit(): void {
    const productoId = Number(this.route.snapshot.paramMap.get('id'));
    //this.producto = this.obtenerProductoPorId(productoId);
  }

  getProductoXId(idProducto: number){
    this.productoService.getProductoXId(idProducto).subscribe({
      next: (data) => {
        if(data != undefined)
          this.producto = data;
        
        console.log("Pruebdatadsa", this.producto);
      },
      error: (error) => {
        console.error('Error al obtener el producto', error);
      }
    });
  }

  obtenerProductoPorId(id: number): Producto {
    // Deberías tener la lista de productos disponible en tu servicio
    // Aquí voy a simular que tengo un array de productos.
    const productos: Producto[] = [
      { id: 1, nombre: 'Producto 1', detalle: 'Descripción del producto 1', precio: 100, imagen: 'producto1.jpg', idCategoria: 1 },
      { id: 2, nombre: 'Producto 2', detalle: 'Descripción del producto 2', precio: 200, imagen: 'producto2.jpg', idCategoria: 2 },
      // Agregar más productos...
    ];
    return productos.find((producto) => producto.id === id)!;
  }

  agregarProducto() {
    if (this.cantidad >= 1) {
      this.carritoService.agregarProducto(this.producto, this.cantidad);
    }
  }

  aumentarCantidad() {
    this.cantidad++;
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  onCantidadChange(event: any) {
    let value = event.target.value;
    if (!value || value < 1) {
      this.cantidad = 1;
    } else {
      this.cantidad = Number(value);
    }
  }
}
