import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.actions';

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router,
    private store: Store<{ items: ItemsState }>) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.saveSession();
    })
  }

  ngOnInit(): void {
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);
      this.showSaveAlert();
    })
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({ id: id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    });
  };

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  showSaveAlert(): void {
    Swal.fire({
      title: "Shopping Cart",
      text: "The item has been saved successfully",
      icon: "success"
    });
  }

}
