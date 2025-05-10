import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];
  total: number = 0;

  constructor(private sharingDataService: SharingDataService, private service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    //this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {

      //this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total }
      });
      this.showSaveAlert();
    })
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {

      Swal.fire({
        title: "Do you want to delete this item?",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          //this.calculateTotal();
          this.saveSession();
          Swal.fire("The item has been successfully deleted", "", "success");
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total }
            });
          });
        } else if (result.isDenied) {
          Swal.fire("An error occurred while deleting the item", "", "info");
        }
      });
    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  showSaveAlert(): void {
    Swal.fire({
      title: "Item saved",
      text: "The item has been saved successfully",
      icon: "success"
    });
  }

  showDeleteAlert(): void {

  }
}
