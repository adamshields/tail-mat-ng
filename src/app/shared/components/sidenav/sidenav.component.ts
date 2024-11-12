// sidenav.component.ts
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuItem } from '../../data/menu-item.interface';
import { SidenavMenuItemComponent } from '../sidenav-menu-item/sidenav-menu-item.component';
import { SIDENAV_MENU_ITEMS } from '../../data/sidenav-menu-data';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation.service';
import { MaterialModules } from '../../../../mat-index';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatSidenavModule,
    SidenavMenuItemComponent,
    MatIconModule,
    ...MaterialModules,
    RouterLink,
    CommonModule
  ],
  template: `
    <div class="sidenav-container">


      <div class="sidenav-header">
        @if (!collapsed()) {
          <span class="header-text">Navigation</span>
        }
        <button
          mat-icon-button
          class="collapse-btn"
          (click)="onCollapse()"
          [class.rotated]="collapsed()"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>
      </div>

      <mat-nav-list>
        @if (sideNavItems$ | async; as items) {
          @for (item of items; track item.id) {
            <app-sidenav-menu-item
              [item]="item"
              [collapsed]="collapsed()"
            />
          }
        }
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidenav-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .sidenav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      min-height: 64px;
    }

    .collapse-btn {
      transition: transform 0.3s ease;

      &.rotated {
        transform: rotate(180deg);
      }
    }

    mat-nav-list {
      padding-top: 0;
    }
  `]
})
export class SidenavComponent {
  private navigationService = inject(NavigationService);

  collapsed = input<boolean>(false);
  collapsedChange = output<boolean>();

  sideNavItems$ = this.navigationService.getSideNavigation();

  constructor() {
    // Debug subscription
    this.sideNavItems$.subscribe(items => {
      console.log('Sidenav items received:', items);
    });
  }

  onCollapse() {
    this.collapsedChange.emit(!this.collapsed());
  }
}
