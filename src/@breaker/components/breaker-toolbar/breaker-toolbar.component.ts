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
    <div class="toolbar-container">
      <div class="actions-group">
        <button mat-raised-button
          *ngFor="let action of config.actions"
          [color]="action.color"
          [disabled]="action.disabled"
          [matTooltip]="action.text"
          (click)="onActionClick(action)">
          <mat-icon>{{action.icon}}</mat-icon>
          {{action.text}}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toolbar-container {
      padding: 16px;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .actions-group {
      display: flex;
      gap: 8px;
    }
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
