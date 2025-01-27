import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Carrito } from '../modelo/carrito';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listCarrito: Carrito[] = [];
  private carritoSubject = new BehaviorSubject<Carrito[]>(this.listCarrito); 
  
  constructor() {
  }

  get carrito$() {
    return this.carritoSubject.asObservable();
  }

  getCarrito() {
    return this.listCarrito;
  }

  agregarProducto(producto: Producto, cantidad: number = 1) {
    const index = this.listCarrito.findIndex(item => item.producto.id == producto.id);
    if(index === -1) {
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizarProducto(index, this.listCarrito[index].cantidad + cantidad);
    }

    this.actualizarCarrito();
  }

  actualizarProducto(index: number, cantidad: number) {
    if(index >= 0 && index < this.listCarrito.length) {
      this.listCarrito[index].cantidad = cantidad;
    }

    this.actualizarCarrito(); 
  }

  eliminarProducto(index: number) {
    if(index >= 0 && index < this.listCarrito.length) {
      this.listCarrito.splice(index, 1);
    }

    this.actualizarCarrito(); 
  }

  private actualizarCarrito() {
    this.carritoSubject.next([...this.listCarrito]);  
  }

  cantidadCarrito() {
    return this.listCarrito.length;
  }

  totalCarrito() {
    return this.listCarrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  }

  /*
  guardarSesion() {
    localStorage.setItem("carrito", JSON.stringify(this.listCarrito));
  }

  obtenerSesion() {
    if (typeof window !== "undefined" && window.localStorage) {
      const carrito = localStorage.getItem("carrito");
      if (carrito != null) {
        this.listCarrito = JSON.parse(carrito);
        this.actualizarCarrito();  
      }
    }
  }
  */
}
