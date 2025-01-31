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
    <mat-toolbar class="relative mat-elevation-z8 z-10 ">
      <!-- Logo -->
      <div class="flex items-center justify-start">
        <a routerLink="/" class="inline-flex items-center hover:text-secondary">
          <span class="text-xl font-bold">{{config.name}}</span>
          <mat-icon class="text-xl mr-2">bolt</mat-icon>
        </a>
      </div>

      <!-- Menu Items -->
      <nav class="flex space-x-1">
      @for (item of horizontalNavItems(); track item.id) {
        @if (!item.hasDropdown) {
          <a [routerLink]="[item.path]" class="flex items-center text-sm py-2 px-3 hover:text-secondary">
            <mat-icon class="text-base">{{item.icon}}</mat-icon>
            <span class="ml-2">{{item.label}}</span>
          </a>
        } @else {
          <a [matMenuTriggerFor]="menu" class="flex items-center text-sm py-2 px-3 hover:text-secondary">
            <mat-icon class="text-base">{{item.icon}}</mat-icon>
            <span class="ml-2">{{item.label}}</span>
            <mat-icon class="text-base ml-1">arrow_drop_down</mat-icon>
          </a>
          <mat-menu #menu="matMenu">
            @for (child of item.dropdownItems; track child.id) {
              <a mat-menu-item [routerLink]="[child.path]" class="inline-flex items-center">
                <mat-icon class="text-lg mr-2">{{child.icon}}</mat-icon>
                <span>{{child.label}}</span>
              </a>
            }
          </mat-menu>
        }
      }
    </nav>

      <!-- Search Bar -->
      <div class="flex-1 flex justify-center density-3xs">
        <form class="w-64">
          <mat-form-field class="w-full" appearance="outline">
            <mat-icon matPrefix class="mr-2">search</mat-icon>
            <input type="text"
                   matInput
                   [formControl]="searchControl"
                   [matAutocomplete]="auto"
                   placeholder="Search...">
            <mat-autocomplete #auto="matAutocomplete">
              @for (option of filteredOptions$ | async; track option) {
                <mat-option [value]="option">{{option}}</mat-option>
              }
            </mat-autocomplete>
          </mat-form-field>
        </form>
      </div>

      <!-- custom color picker -->
      @if (config.features.allowColorPicker) {
        <app-color-picker/>
      }

      <!-- Theme Toggler -->
      <button
        mat-icon-button
        class="theme-toggle"
        aria-label="Change theme"
        [matMenuTriggerFor]="themeMenu"
      >
        <mat-icon>{{
          (isDark$ | async) === true ? "dark_mode" : "light_mode"
        }}</mat-icon>
      </button>
      <mat-menu #themeMenu="matMenu">
        <button mat-menu-item (click)="changeTheme('auto')">System</button>
        <button mat-menu-item (click)="changeTheme('light')">Light</button>
        <button mat-menu-item (click)="changeTheme('dark')">Dark</button>
      </mat-menu>

      <!-- Profile Button -->
      <button mat-icon-button [matMenuTriggerFor]="profileMenu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #profileMenu="matMenu">
        <button mat-menu-item (click)="openDialog()">
          <mat-icon>edit</mat-icon>
          <span>Edit Profile</span>
        </button>
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Account Settings</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [],
})
export class AppToolbarComponent {
  private themeManager = inject(ThemeManager);
  protected config = inject(APP_CONFIG_TOKEN);

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
