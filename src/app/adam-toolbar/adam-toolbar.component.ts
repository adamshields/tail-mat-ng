import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../mat-index';
import { ColorPickerComponent } from '../shared/components/color-picker/color-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map, Subscribable } from 'rxjs';
import { UserProfileDialogComponent } from '../../@breaker/user-profile-dialog/user-profile-dialog.component';
import { APP_CONFIG_TOKEN } from '../app.config';
// import { NavItem } from '../core/models/navigation.types';
import { ThemeManager } from '../theme-manager.service';
import { menuItems } from './menu-data';

@Component({
  selector: 'app-adam-toolbar',
  standalone: true,
  imports: [...MaterialModules, RouterModule, CommonModule, ColorPickerComponent, ReactiveFormsModule],
  templateUrl: './adam-toolbar.component.html',
  styleUrl: './adam-toolbar.component.scss'
})
export class AdamToolbarComponent {
  themeManager = inject(ThemeManager);
  protected config = inject(APP_CONFIG_TOKEN);
  mobileMenuOpen = false;
  openDropdown: string | null = null;
  menuItems = menuItems;

  applications = true;

userName: string|null|undefined;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.openDropdown = null;
  }

  toggleDropdown(id: string) {
    this.openDropdown = this.openDropdown === id ? null : id;
  }

  closeAllDropdowns() {
    this.openDropdown = null;
    this.mobileMenuOpen = false;
  }

  searchControl = new FormControl('');
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions$: Observable<string[]>;

  isDark$ = this.themeManager.isDark$;

  private dialog = inject(MatDialog);

  constructor() {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  openDialog() {
    this.dialog.open(UserProfileDialogComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog'
    });
  }


}



