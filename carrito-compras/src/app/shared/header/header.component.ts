import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';
import { Carrito } from '../../core/modelo/carrito';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public carritoService = inject(CarritoService);
  public productosCarrito: Carrito[] = [];

  ngOnInit() {
    // Suscribirse al carrito para obtener los productos y la cantidad en tiempo real
    this.carritoService.carrito$.subscribe(carrito => {
      this.productosCarrito = carrito;  // Actualizamos el carrito
    });
  }

  // Método para abrir el modal del carrito
  openCarritoModal() {
    const modalElement = document.getElementById('carritoModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);  // Usamos Bootstrap Modal desde la ventana global
      modal.show();
    }
  }
}
