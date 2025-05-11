import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  total = 0;
  items: CartItem[] = [];


  constructor(
    private sharingDataService: SharingDataService,
    private store: Store<{ items: ItemsState }>
  ) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number): void {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
