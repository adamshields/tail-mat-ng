// display-only.directive.ts
import { Directive, Input, OnInit, inject, ElementRef } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'mat-form-field[displayOnly]',
  standalone: true,
  host: {
    'class': 'w-full bg-transparent focus:outline-none hover:bg-transparent active:bg-transparent focus:bg-transparent cursor-default'
  }
})
export class DisplayOnlyDirective implements OnInit {
  @Input() showLock = true;

  private matFormField = inject(MatFormField);
  private ngControl = inject(NgControl, { optional: true });
  private el = inject(ElementRef);

  ngOnInit() {
    const element = this.matFormField._elementRef.nativeElement;

    // Set appearance and label behavior
    this.matFormField.appearance = 'fill';
    this.matFormField.floatLabel = 'always';

    // Find or create the mat-label element
    const label = element.querySelector('mat-label');
    if (label && this.showLock) {
      // Create the icon element
      const icon = document.createElement('mat-icon');
      icon.className = 'text-sm w-2 h-2 p-0 box-content inline-block text-gray-400 dark:text-gray-500';
      icon.textContent = 'lock';

      // Insert icon at the start of the label
      label.insertBefore(icon, label.firstChild);
    }

    // Set readonly on the input
    const input = element.querySelector('input');
    if (input) {
      input.readOnly = true;
    }

    // Handle form control if it exists
    if (this.ngControl?.control) {
      this.ngControl.control.disable();
    }
  }
}
