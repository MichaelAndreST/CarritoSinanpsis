import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Carrito } from '../modelo/carrito';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private listCarrito: Carrito[] = [];
  private carritoSubject = new BehaviorSubject<Carrito[]>([]);

  constructor() {
    this.cargarCarritoDesdeLocalStorage();
  }

  get carrito$() {
    return this.carritoSubject.asObservable();
  }

  agregarProducto(producto: Producto, cantidad: number = 1) {
    const index = this.listCarrito.findIndex((item) => item.producto.id === producto.id);
    if (index === -1) {
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizarProducto(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.actualizarCarrito();
  }

  actualizarProducto(index: number, cantidad: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito[index].cantidad = cantidad;
      this.actualizarCarrito();
    }
  }

  eliminarProducto(index: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito.splice(index, 1);
      this.actualizarCarrito();
    }
  }

  cantidadCarrito() {
    return this.listCarrito.length;
  }

  totalCarrito() {
    return this.listCarrito.reduce(
      (sum, item) => sum + item.producto.precio * item.cantidad,
      0
    );
  }

  private actualizarCarrito() {
    this.carritoSubject.next([...this.listCarrito]);
    this.guardarCarritoEnLocalStorage();
  }

  private guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.listCarrito));
  }

  private cargarCarritoDesdeLocalStorage() {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.listCarrito = JSON.parse(data);
      this.carritoSubject.next(this.listCarrito);
    }
  }
}
