import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'b-column',
  standalone: true,
})
export class BreakerColumnDirective {
  @Input() field!: string; // Field name in the data object
  @Input() headerText!: string; // Display text for the column header
  @Input() width?: string; // Optional column width
  @Input() filterable?: boolean = false; // Whether this column is filterable
  @Input() customTemplate?: TemplateRef<any>; // Optional custom template for the column content
  @Input() searchable?: boolean = false; // For global search
}
