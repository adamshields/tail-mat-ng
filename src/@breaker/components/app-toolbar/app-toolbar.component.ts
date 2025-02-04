import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../app/shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../../app/shared/data/toolbar-menu-data';
import { ThemeManager } from '../../../app/theme-manager.service';
import { NavigationService } from '../../../app/core/services/navigation.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { ColorPickerComponent } from "../../../app/shared/components/color-picker/color-picker.component";
import { NavItem } from '../../../app/core/models/navigation.types';
import { APP_CONFIG_TOKEN } from '../../../app/app.config';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...MaterialModules, RouterModule, CommonModule, ColorPickerComponent, ReactiveFormsModule],
  template: `
<nav class="relative z-50 bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
  <!-- Logo -->
  <div class="flex items-center">
    <a routerLink="/" class="inline-flex items-center hover:text-secondary space-x-2">
      <span class="text-xl font-bold">{{ config.name }}</span>
      <mat-icon class="text-base">bolt</mat-icon>
    </a>
  </div>

  <!-- Desktop Menu -->
  <div class="hidden xl:flex space-x-4">
    @for (item of horizontalNavItems(); track item.id) {
      @if (!item.hasDropdown) {
        <a [routerLink]="[item.path]" (click)="closeAllDropdowns()"
           class="flex items-center space-x-2 text-sm py-2 px-4 hover:bg-gray-700 rounded">
          <mat-icon class="text-base">{{ item.icon }}</mat-icon>
          <span class="leading-none">{{ item.label }}</span>
        </a>
      } @else {
        <div class="relative">
          <button (click)="toggleDropdown(item.id)" class="flex items-center space-x-2 text-sm py-2 px-4 hover:bg-gray-700 rounded">
            <mat-icon class="text-base">{{ item.icon }}</mat-icon>
            <span class="leading-none">{{ item.label }}</span>
            <mat-icon class="text-base">arrow_drop_down</mat-icon>
          </button>
          <div *ngIf="openDropdown === item.id && item.dropdownItems?.length"
               class="absolute left-0 mt-2 min-w-[220px] bg-gray-800 text-white shadow-lg rounded z-50">
            @for (child of item.dropdownItems; track child.id) {
              <a [routerLink]="[child.path]" (click)="closeAllDropdowns()"
                 class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 whitespace-nowrap">
                <mat-icon class="text-base">{{ child.icon }}</mat-icon>
                <span class="leading-none">{{ child.label }}</span>
              </a>
            }
          </div>
        </div>
      }
    }
  </div>

  <!-- Mobile Menu Button -->
  <button (click)="toggleMobileMenu()" class="xl:hidden block p-2">
  <mat-icon class="text-base">menu</mat-icon>
  </button>

  <!-- Mobile Menu -->
  <div *ngIf="mobileMenuOpen" class="absolute top-full left-0 w-full bg-gray-800 shadow-lg xl:hidden flex flex-col z-50">
    @for (item of horizontalNavItems(); track item.id) {
      <div class="relative">
        @if (!item.hasDropdown) {
          <a [routerLink]="[item.path]" (click)="closeAllDropdowns()"
             class="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 w-full">
            <mat-icon class="text-base">{{ item.icon }}</mat-icon>
            <span class="leading-none">{{ item.label }}</span>
          </a>
        } @else {
          <button (click)="toggleDropdown(item.id)" class="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 w-full">
            <mat-icon class="text-base">{{ item.icon }}</mat-icon>
            <span class="leading-none">{{ item.label }}</span>
            <mat-icon class="text-base">arrow_drop_down</mat-icon>
          </button>
          <div *ngIf="openDropdown === item.id && item.dropdownItems?.length"
               class="bg-gray-700 text-white shadow-lg rounded w-full z-50">
            @for (child of item.dropdownItems; track child.id) {
              <a [routerLink]="[child.path]" (click)="closeAllDropdowns()"
                 class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-600 whitespace-nowrap">
                 <mat-icon class="text-base">{{ child.icon }}</mat-icon>
                <span class="leading-none">{{ child.label }}</span>
              </a>
            }
          </div>
        }
      </div>
    }
  </div>

  <!-- Search Bar -->
  <div class="hidden md:flex items-center w-64">
    <input type="text"
      [formControl]="searchControl"
      class="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring focus:ring-blue-500"
      placeholder="Search...">
  </div>

  <!-- Theme Toggle (Dropdown) -->
  <div class="relative">
    <button (click)="toggleDropdown('theme')" class="p-2 rounded hover:bg-gray-700">
    <mat-icon class="text-xl">
        {{ (isDark$ | async) === true ? "dark_mode" : "light_mode" }}
    </mat-icon>
    </button>
    <div *ngIf="openDropdown === 'theme'" class="absolute top-full right-4 min-w-[150px] bg-gray-800 text-white shadow-lg rounded z-50">
      <button (click)="changeTheme('auto'); closeAllDropdowns()" class="block w-full text-left px-4 py-2 hover:bg-gray-700">System</button>
      <button (click)="changeTheme('light'); closeAllDropdowns()" class="block w-full text-left px-4 py-2 hover:bg-gray-700">Light</button>
      <button (click)="changeTheme('dark'); closeAllDropdowns()" class="block w-full text-left px-4 py-2 hover:bg-gray-700">Dark</button>
    </div>
  </div>


    <!-- Profile Dropdown () -->
    <div class="relative">
    <button (click)="toggleDropdown('profile')" class="p-2 rounded hover:bg-gray-700">
    <mat-icon class="text-xl">account_circle</mat-icon>
    </button>
    <div *ngIf="openDropdown === 'profile'" class="absolute top-full right-4 min-w-[200px] bg-gray-800 text-white shadow-lg rounded p-2 z-50">
      <a href="#" class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 whitespace-nowrap" (click)="closeAllDropdowns()">
        <mat-icon class="text-base">edit</mat-icon>
        <span>Edit Profile</span>
      </a>
      <a href="#" class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 whitespace-nowrap" (click)="closeAllDropdowns()">
        <mat-icon class="text-base">settings</mat-icon>
        <span>Settings</span>
      </a>
      <div class="border-t border-gray-700 my-1"></div>
      <a href="#" class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 whitespace-nowrap" (click)="closeAllDropdowns()">
        <mat-icon class="text-base">logout</mat-icon>
        <span>Logout</span>
      </a>
    </div>
  </div>
</nav>



  `,
  styles: [],
})
export class AppToolbarComponent {
  private themeManager = inject(ThemeManager);
  protected config = inject(APP_CONFIG_TOKEN);
  mobileMenuOpen = false;
  openDropdown: string | null = null;

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
  horizontalNavItems = input.required<NavItem[]>();
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
