import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss',
  host: {
    class: 'fuck'
  }
})
export class CustomCardComponent {
  @Input() variant: 'default' | 'elevated' = 'default';
}
