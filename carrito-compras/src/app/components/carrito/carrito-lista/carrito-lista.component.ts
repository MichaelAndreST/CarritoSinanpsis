import { Component, OnInit, inject } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { Carrito } from '../../../core/modelo/carrito';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito-lista.component.html',
  styleUrls: ['./carrito-lista.component.scss'],
})
export class CarritoListaComponent implements OnInit {
  public carritoService = inject(CarritoService);
  listaCarrito: Carrito[] = [];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.carritoService.carrito$.subscribe((data) => {
      this.listaCarrito = data;
    });
  }

  eliminarItem(index: number) {
    this.carritoService.eliminarProducto(index);
  }

  onKeyDown(event: any) {
    event.preventDefault();
  }

  actualizarCarrito(item: Carrito, index: number) {
    this.carritoService.actualizarProducto(index, item.cantidad);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
