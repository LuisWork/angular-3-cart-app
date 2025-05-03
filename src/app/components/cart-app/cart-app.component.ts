import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-cart-app',
  imports: [CatalogComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{

  products!: Product[];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
  }

}
