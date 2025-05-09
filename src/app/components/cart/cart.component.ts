import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  total = 0;
  items: CartItem[] = [];
  idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }
}
