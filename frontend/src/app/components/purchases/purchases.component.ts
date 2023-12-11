import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Purchase } from '../../interfaces/Purchase';
@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent {
  @Input() purchases: Purchase[] = [];
  @Input() show: boolean = false;
}
