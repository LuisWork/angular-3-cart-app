import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];

  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() closeCartEventEmitter = new EventEmitter();

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }

  closeCart(): void {
    this.closeCartEventEmitter.emit();
  }

}
