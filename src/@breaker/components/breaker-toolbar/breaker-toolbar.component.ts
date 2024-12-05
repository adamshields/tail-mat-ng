// breaker-toolbar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ToolbarAction {
  id: 'add' | 'edit' | 'delete' | string;
  icon: string;
  text: string;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
}

export interface ToolbarConfig {
  actions: ToolbarAction[];
  showSearch?: boolean;
}

@Component({
  selector: 'breaker-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
  <div class="p-4 flex items-center gap-2">
    <!-- Wrapper for buttons -->
    <div class="flex gap-2">
      <button mat-raised-button
        *ngFor="let action of config.actions"
        [color]="action.color"
        [disabled]="action.disabled"
        [matTooltip]="action.text"
        class="flex items-center gap-2 px-4 py-2"
        (click)="onActionClick(action)">
        <mat-icon>{{action.icon}}</mat-icon>
        {{action.text}}
      </button>
    </div>
  </div>

  `,
  styles: [`
  // @use '@angular/material' as mat;

  // // Customize the entire app. Change :root to your selector if you want to scope the styles.
  // :host {
  //   @include mat.button-overrides((
  //     container-height: 2rem,
  //     container-shape: 0.25rem,
  //     horizontal-padding: 1rem
  //   ));
  // }
  `]
})
export class BreakerToolbarComponent {
  // Option 1: Provide default config
  @Input() config: ToolbarConfig = {
    actions: [],
    showSearch: false
  };

  @Output() actionClick = new EventEmitter<{actionId: string; data?: any}>();

  onActionClick(action: ToolbarAction) {
    this.actionClick.emit({ actionId: action.id });
  }
}
