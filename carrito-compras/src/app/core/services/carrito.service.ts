import { Injectable } from '@angular/core';
import { Carrito } from '../modelo/carrito';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listCarrito: Carrito[] = [];
  
  getCarrito(){
    return this.listCarrito;
  }

  agregarProducto(producto: Producto, cantidad: number = 1) {
    const index = this.listCarrito.findIndex(item => item.producto.id == producto.id);

    if(index == -1){
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizarProducto(index, this.listCarrito[index].cantidad + cantidad);
    }
  }

  actualizarProducto(index: number, cantidad: number){
    if(index >= 0 && index < this.listCarrito.length){
      this.listCarrito[index].cantidad = cantidad;
    }
  }

  cantidadCarrito() {
    return this.listCarrito.length;
  }

  totalCarrito() {
    const total = this.listCarrito.reduce((sum, item) => 
      (sum + (item.producto.precio * item.cantidad)), 0
    );

    return total;
  }

  eliminarProducto(index: number){
    if(index >= 0 && index < this.listCarrito.length){
      this.listCarrito.splice(index, 1);
    }
  }

  guardarSesion(){
    localStorage.setItem("carrito",JSON.stringify(this.listCarrito));
  }

  obtenerSesion(){
    this.listCarrito = [];

    if(typeof window != "undefined" && window.localStorage){
      const carrito = localStorage.getItem("carrito");
      if(carrito != null){
        this.listCarrito = JSON.parse(carrito);
      }
    }
  }
}
