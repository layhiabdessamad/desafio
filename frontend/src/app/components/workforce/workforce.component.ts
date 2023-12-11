import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Workforce } from '../../interfaces/Workforce';

@Component({
  selector: 'app-workforce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workforce.component.html',
  styleUrl: './workforce.component.css',
})
export class WorkforceComponent {
  @Input() workforce: Workforce[] = [];
  @Input() show: boolean = false;
}
