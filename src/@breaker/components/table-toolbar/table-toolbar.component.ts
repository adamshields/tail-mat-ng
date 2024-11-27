import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableToolbarConfig } from '../../models/table-config.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-toolbar',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, CommonModule],
  templateUrl: './table-toolbar.component.html',
  styleUrl: './table-toolbar.component.scss'
})

export class TableToolbarComponent {
  @Input() toolbarConfig!: TableToolbarConfig;
  @Output() search = new EventEmitter<string>();
  @Output() clearFilters = new EventEmitter<void>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input?.value || '');
  }
}
