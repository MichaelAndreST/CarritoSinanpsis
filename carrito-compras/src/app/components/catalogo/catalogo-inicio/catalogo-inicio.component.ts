import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../core/modelo/categoria';
import { CategoriaService } from '../../../core/services/categoria.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo-inicio',
  imports: [CommonModule, FormsModule, RouterModule],
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

  // Para almacenar los productos agrupados por categoría
  productosAgrupados: { categoria: Categoria, productos: Producto[] }[] = [];

  ngOnInit(): void {
    this.getCategorias();
    this.getProducto();
  }

  getProducto() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
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
        this.categorias.unshift({ id: 0, nombre: 'Todos' });  // Añadimos la opción "Todos" al principio
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  agregarProducto(item: Producto){
    this.carritoService.agregarProducto(item);
  }

  filtrarProductos(): void {
    console.log('Filtrando productos... Categoría seleccionada:', this.categoriaSeleccionada);

    if (this.categoriaSeleccionada == 0) {
      // Mostrar todos los productos
      this.productosFiltrados = [...this.productos];
    } else {
      // Filtrar productos según la categoría seleccionada
      this.productosFiltrados = this.productos.filter(
        (producto) => producto.idCategoria == this.categoriaSeleccionada
      );
    }

    // Agrupar los productos por categoría
    this.agruparProductosPorCategoria();
    console.log('Productos agrupados:', this.productosAgrupados);
  }

  agruparProductosPorCategoria() {
    this.productosAgrupados = [];

    // Agrupar productos por cada categoría
    this.categorias.forEach(categoria => {
      const productosDeCategoria = this.productosFiltrados.filter(
        producto => producto.idCategoria == categoria.id
      );

      if (productosDeCategoria.length > 0) {
        this.productosAgrupados.push({
          categoria,
          productos: productosDeCategoria
        });
      }
    });
  }
}
