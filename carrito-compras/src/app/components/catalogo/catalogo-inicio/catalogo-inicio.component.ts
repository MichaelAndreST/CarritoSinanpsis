import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../core/modelo/categoria';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-catalogo-inicio',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-inicio.component.html',
  styleUrl: './catalogo-inicio.component.scss'
})
export class CatalogoInicioComponent implements OnInit {
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  private carritoService = inject(CarritoService);

  productos: Producto[] = [];
  categorias: Categoria[] = []; 
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada = 0;

  ngOnInit(): void {
    this.filtrarProductos();
    this.getCategorias();
    this.getProducto();
  }

  getProducto() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.categorias = [
          { id: 0, nombre: 'Todos' }, 
          ...[...new Set(this.productos.map(producto => producto.idCategoria))]
            .map(id => ({
              id,
              nombre: this.obtenerNombreCategoria(id) 
            }))
        ];
        this.filtrarProductos(); 
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.id === idCategoria);
    return categoria ? categoria.nombre : 'Desconocida';
  }

  agregarProducto(item: Producto){
    this.carritoService.agregarProducto(item);
  }

  filtrarProductos(): void {
    console.log('Filtrando productos... Categoría seleccionada:', this.categoriaSeleccionada);  // Verifica la categoría seleccionada
    if (this.categoriaSeleccionada == 0) {
      this.productosFiltrados = [...this.productos];  // Mostrar todos los productos
    } else {

      console.log("data producto", this.productos);

      this.productosFiltrados = this.productos.filter((producto) => {
        return producto.idCategoria == this.categoriaSeleccionada;
      });
    }
    console.log('Productos filtrados:', this.productosFiltrados);  // Verifica los productos filtrados
  }
}
