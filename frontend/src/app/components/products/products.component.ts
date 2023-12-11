import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Input() show: boolean = false;
}
