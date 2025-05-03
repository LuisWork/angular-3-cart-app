import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  @Input() products!: Product[];

}
