// Basic types
export type ColumnType = 'text' | 'number' | 'date' | 'boolean';
export type GridEventType = 'add' | 'edit' | 'delete' | 'save' | 'cancel';

// Column configuration
export interface BreakerColumn {
  field: string;
  type: ColumnType;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
}

// Grid configuration
export interface BreakerGridConfig {
  allowPaging: boolean;
  allowSorting: boolean;
  allowFiltering: boolean;
  pageSize?: number;
}


// breaker-base.interface.ts
export interface IBreakerComponent {
  registerEvents(events: string[]): void;
  destroy(): void;
}

// breaker-grid.types.ts
export interface BreakerGridEvent {
  type: 'add' | 'edit' | 'delete';
  data?: any;
}
