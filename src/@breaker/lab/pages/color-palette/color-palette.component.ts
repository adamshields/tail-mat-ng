import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 space-y-8">
      <h1 class="text-2xl font-bold">Color Palette</h1>

      <!-- Material Colors Section -->
      <h2 class="text-xl font-semibold mb-4">Material Theme Colors</h2>
      <p>These colors are sourced from the Material System. Switch to Dark mode to see the dark colors</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <ng-container *ngFor="let color of materialColors">
          <div class="flex flex-col items-center p-2 border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow">
            <div
              class="w-16 h-16 rounded mb-2 border border-gray-100"
              [style.backgroundColor]="color.value">
            </div>
            <div class="text-sm font-mono break-all text-center">
              <code>{{color.className}}</code>
            </div>
            <div class="text-xs text-gray-600 mt-1">From Material System</div>
            <button class="text-blue-600 text-xs underline mt-1" (click)="copyToClipboard(color.className)">Copy Class</button>
          </div>
        </ng-container>
      </div>

      <!-- Tailwind Colors Section -->
      <h2 class="text-xl font-semibold mb-4">Tailwind Native Colors</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <ng-container *ngFor="let color of tailwindColors">
          <div class="flex flex-col items-center p-2 border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow">
            <div
              class="w-16 h-16 rounded mb-2 border border-gray-100"
              [ngClass]="color.bgClass">
            </div>
            <div class="text-sm font-mono break-all text-center">
              <code>{{color.bgClass}}</code>
            </div>
            <div class="text-xs text-gray-600 mt-1">From Tailwind</div>
            <button class="text-blue-600 text-xs underline mt-1" (click)="copyToClipboard(color.bgClass)">Copy Class</button>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    /* No specific component styles needed, Tailwind does the heavy lifting */
  `]
})
export class ColorPaletteComponent {
  materialColors = [
    { name: 'background', value: 'var(--sys-background)', className: 'bg-background' },
    { name: 'on-background', value: 'var(--sys-on-background)', className: 'bg-on-background' },
    { name: 'surface', value: 'var(--sys-surface)', className: 'bg-surface' },
    { name: 'surface-dim', value: 'var(--sys-surface-dim)', className: 'bg-surface-dim' },
    { name: 'surface-bright', value: 'var(--sys-surface-bright)', className: 'bg-surface-bright' },
    { name: 'surface-container-lowest', value: 'var(--sys-surface-container-lowest)', className: 'bg-surface-container-lowest' },
    { name: 'surface-container-low', value: 'var(--sys-surface-container-low)', className: 'bg-surface-container-low' },
    { name: 'surface-container', value: 'var(--sys-surface-container)', className: 'bg-surface-container' },
    { name: 'surface-container-high', value: 'var(--sys-surface-container-high)', className: 'bg-surface-container-high' },
    { name: 'surface-container-highest', value: 'var(--sys-surface-container-highest)', className: 'bg-surface-container-highest' },
    { name: 'on-surface', value: 'var(--sys-on-surface)', className: 'bg-on-surface' },
    { name: 'surface-variant', value: 'var(--sys-surface-variant)', className: 'bg-surface-variant' },
    { name: 'on-surface-variant', value: 'var(--sys-on-surface-variant)', className: 'bg-on-surface-variant' },
    { name: 'inverse-surface', value: 'var(--sys-inverse-surface)', className: 'bg-inverse-surface' },
    { name: 'inverse-on-surface', value: 'var(--sys-inverse-on-surface)', className: 'bg-inverse-on-surface' },
    { name: 'outline', value: 'var(--sys-outline)', className: 'bg-outline' },
    { name: 'outline-variant', value: 'var(--sys-outline-variant)', className: 'bg-outline-variant' },
    { name: 'shadow', value: 'var(--sys-shadow)', className: 'bg-shadow' },
    { name: 'scrim', value: 'var(--sys-scrim)', className: 'bg-scrim' },
    { name: 'surface-tint', value: 'var(--sys-surface-tint)', className: 'bg-surface-tint' },
    { name: 'primary', value: 'var(--sys-primary)', className: 'bg-primary' },
    { name: 'on-primary', value: 'var(--sys-on-primary)', className: 'bg-on-primary' },
    { name: 'primary-container', value: 'var(--sys-primary-container)', className: 'bg-primary-container' },
    { name: 'on-primary-container', value: 'var(--sys-on-primary-container)', className: 'bg-on-primary-container' },
    { name: 'inverse-primary', value: 'var(--sys-inverse-primary)', className: 'bg-inverse-primary' },
    { name: 'secondary', value: 'var(--sys-secondary)', className: 'bg-secondary' },
    { name: 'on-secondary', value: 'var(--sys-on-secondary)', className: 'bg-on-secondary' },
    { name: 'secondary-container', value: 'var(--sys-secondary-container)', className: 'bg-secondary-container' },
    { name: 'on-secondary-container', value: 'var(--sys-on-secondary-container)', className: 'bg-on-secondary-container' },
    { name: 'tertiary', value: 'var(--sys-tertiary)', className: 'bg-tertiary' },
    { name: 'on-tertiary', value: 'var(--sys-on-tertiary)', className: 'bg-on-tertiary' },
    { name: 'tertiary-container', value: 'var(--sys-tertiary-container)', className: 'bg-tertiary-container' },
    { name: 'on-tertiary-container', value: 'var(--sys-on-tertiary-container)', className: 'bg-on-tertiary-container' },
    { name: 'error', value: 'var(--sys-error)', className: 'bg-error' },
    { name: 'on-error', value: 'var(--sys-on-error)', className: 'bg-on-error' },
    { name: 'error-container', value: 'var(--sys-error-container)', className: 'bg-error-container' },
    { name: 'on-error-container', value: 'var(--sys-on-error-container)', className: 'bg-on-error-container' },
    { name: 'neutral', value: 'var(--sys-neutral)', className: 'bg-neutral' },
    { name: 'neutral-variant', value: 'var(--sys-neutral-variant)', className: 'bg-neutral-variant' },
    { name: 'primary-fixed', value: 'var(--sys-primary-fixed)', className: 'bg-primary-fixed' },
    { name: 'primary-fixed-dim', value: 'var(--sys-primary-fixed-dim)', className: 'bg-primary-fixed-dim' },
    { name: 'on-primary-fixed', value: 'var(--sys-on-primary-fixed)', className: 'bg-on-primary-fixed' },
    { name: 'on-primary-fixed-variant', value: 'var(--sys-on-primary-fixed-variant)', className: 'bg-on-primary-fixed-variant' },
    { name: 'secondary-fixed', value: 'var(--sys-secondary-fixed)', className: 'bg-secondary-fixed' },
    { name: 'secondary-fixed-dim', value: 'var(--sys-secondary-fixed-dim)', className: 'bg-secondary-fixed-dim' },
    { name: 'on-secondary-fixed', value: 'var(--sys-on-secondary-fixed)', className: 'bg-on-secondary-fixed' },
    { name: 'on-secondary-fixed-variant', value: 'var(--sys-on-secondary-fixed-variant)', className: 'bg-on-secondary-fixed-variant' },
    { name: 'tertiary-fixed', value: 'var(--sys-tertiary-fixed)', className: 'bg-tertiary-fixed' },
    { name: 'tertiary-fixed-dim', value: 'var(--sys-tertiary-fixed-dim)', className: 'bg-tertiary-fixed-dim' },
    { name: 'on-tertiary-fixed', value: 'var(--sys-on-tertiary-fixed)', className: 'bg-on-tertiary-fixed' },
    { name: 'on-tertiary-fixed-variant', value: 'var(--sys-on-tertiary-fixed-variant)', className: 'bg-on-tertiary-fixed-variant' },
    { name: 'inverse-secondary', value: 'var(--sys-inverse-secondary)', className: 'bg-inverse-secondary' },
    { name: 'inverse-tertiary', value: 'var(--sys-inverse-tertiary)', className: 'bg-inverse-tertiary' },
    { name: 'inverse-error', value: 'var(--sys-inverse-error)', className: 'bg-inverse-error' },
    { name: 'error-fixed', value: 'var(--sys-error-fixed)', className: 'bg-error-fixed' },
    { name: 'error-fixed-dim', value: 'var(--sys-error-fixed-dim)', className: 'bg-error-fixed-dim' },
    { name: 'on-error-fixed', value: 'var(--sys-on-error-fixed)', className: 'bg-on-error-fixed' },
    { name: 'on-error-fixed-variant', value: 'var(--sys-on-error-fixed-variant)', className: 'bg-on-error-fixed-variant' },
  ];


  tailwindColors = [
    { bgClass: 'bg-white' },
    { bgClass: 'bg-black' },
    { bgClass: 'bg-blue' },
  ];

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    console.log(`Copied: ${text}`);
  }
}
