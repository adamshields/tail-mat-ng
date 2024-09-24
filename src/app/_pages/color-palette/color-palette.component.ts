import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements OnInit {
  colorCategories = ['primary', 'secondary', 'tertiary', 'error'];
  colorShades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  surfaceColors = [
    { name: 'Surface Dim', variable: '--mat-surface-dim' },
    { name: 'Surface', variable: '--mat-surface' },
    { name: 'Surface Bright', variable: '--mat-surface-bright' },
    { name: 'Surface Container Lowest', variable: '--mat-surface-container-lowest' },
    { name: 'Surface Container Low', variable: '--mat-surface-container-low' },
    { name: 'Surface Container', variable: '--mat-surface-container' },
    { name: 'Surface Container High', variable: '--mat-surface-container-high' },
    { name: 'Surface Container Highest', variable: '--mat-surface-container-highest' }
  ];
  additionalColors = [
    { name: 'On Surface', variable: '--mat-on-surface' },
    { name: 'On Surface Variant', variable: '--mat-on-surface-variant' },
    { name: 'Outline', variable: '--mat-outline' },
    { name: 'Outline Variant', variable: '--mat-outline-variant' },
    { name: 'Scrim', variable: '--mat-scrim' },
    { name: 'Shadow', variable: '--mat-shadow' },
    { name: 'Inverse Surface', variable: '--mat-inverse-surface' },
    { name: 'Inverse On Surface', variable: '--mat-inverse-on-surface' },
    { name: 'Inverse Primary', variable: '--mat-inverse-primary' }
  ];

  ngOnInit() {
    document.body.classList.add('mat-app-background');
  }

  getColor(category: string, shade: number): string {
    return `var(--mat-${category}-${shade})`;
  }

  getTextColor(shade: number): string {
    return shade > 50 ? '#000000' : '#ffffff';
  }
}
