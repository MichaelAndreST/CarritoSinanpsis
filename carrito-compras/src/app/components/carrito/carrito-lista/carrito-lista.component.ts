import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { Carrito } from '../../../core/modelo/carrito';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito-lista.component.html',
  styleUrl: './carrito-lista.component.scss'
})
export class CarritoListaComponent implements OnInit{
  public carritoService = inject(CarritoService);
  listaCarrito:Carrito[] = [];

  ngOnInit(): void {
    this.getListaCarrito();    
  }

  getListaCarrito(){
    this.listaCarrito = this.carritoService.getCarrito();
  }

  eliminarItem(index: number){
    this.carritoService.eliminarProducto(index);
    this.carritoService.getCarrito();

    
  }

  onKeyDown(event: any){
    event.preventDefault();
  }

  actualizarCarrito(item: Carrito, index: number){
    this.carritoService.actualizarProducto(index, item.cantidad);
  }
}
