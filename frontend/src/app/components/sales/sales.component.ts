import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../interfaces/Sale';
@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent {
  @Input() sales: Sale[] = [];
  @Input() show: boolean = false;
}
