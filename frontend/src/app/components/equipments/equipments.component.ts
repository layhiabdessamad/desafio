import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Equipment } from '../../interfaces/Equipment';

@Component({
  selector: 'app-equipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.css',
})
export class EquipmentsComponent {
  @Input() equipments: Equipment[] = [];
  @Input() show: boolean = false;
}
