import { Component, inject, signal } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-page',
  standalone: true,
  imports: [...MaterialModules, CommonModule, RouterModule, ReactiveFormsModule],

  template: `
    <div class="p-4">
      <!-- Search Bar -->
      <mat-card class="mb-4">
        <mat-card-content>
          <div class="flex gap-4 items-center">
            <mat-form-field class="w-full">
              <mat-icon matPrefix>search</mat-icon>
              <input matInput
                     [formControl]="searchControl"
                     [placeholder]="'Search ' + getPageTitle()">
            </mat-form-field>
            <button mat-stroked-button (click)="toggleFilters()">
              <mat-icon>filter_list</mat-icon>
              Filters
            </button>
          </div>

          @if (showFilters()) {
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <mat-form-field>
                <mat-label>Status</mat-label>
                <mat-select>
                  <mat-option value="all">All</mat-option>
                  <mat-option value="active">Active</mat-option>
                  <mat-option value="pending">Pending</mat-option>
                  <mat-option value="completed">Completed</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Date Range</mat-label>
                <mat-select>
                  <mat-option value="today">Today</mat-option>
                  <mat-option value="week">This Week</mat-option>
                  <mat-option value="month">This Month</mat-option>
                  <mat-option value="custom">Custom Range</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Sort By</mat-label>
                <mat-select>
                  <mat-option value="newest">Newest First</mat-option>
                  <mat-option value="oldest">Oldest First</mat-option>
                  <mat-option value="az">A-Z</mat-option>
                  <mat-option value="za">Z-A</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          }
        </mat-card-content>
      </mat-card>

      <!-- Dynamic Layout Based on Route -->
      @switch (getRouteType()) {
        @case ('overview') {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (card of getOverviewCards(); track card.title) {
              <mat-card class="cursor-pointer hover:shadow-lg transition-shadow"
                        (click)="handleCardClick(card)">
                <mat-card-content>
                  <div class="flex items-center gap-4">
                    <mat-icon [class]="card.iconClass">{{card.icon}}</mat-icon>
                    <div>
                      <div class="text-xl font-bold">{{card.title}}</div>
                      <div class="text-gray-600">{{card.subtitle}}</div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            }
          </div>
        }

        @case ('detail') {
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{getPageTitle()}} Details</mat-card-title>
              <mat-card-subtitle>Detailed information and actions</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <mat-tab-group>
                <mat-tab label="Information">
                  <div class="p-4">
                    <mat-list>
                      @for (detail of getMockDetails(); track detail.label) {
                        <mat-list-item>
                          <span matListItemTitle>{{detail.label}}</span>
                          <span matListItemLine>{{detail.value}}</span>
                        </mat-list-item>
                      }
                    </mat-list>
                  </div>
                </mat-tab>
                <mat-tab label="Activity">
                  <div class="p-4">
                    <mat-list>
                      @for (activity of getMockActivity(); track activity.id) {
                        <mat-list-item>
                          <mat-icon matListItemIcon>{{activity.icon}}</mat-icon>
                          <div matListItemTitle>{{activity.action}}</div>
                          <div matListItemLine>{{activity.timestamp}}</div>
                        </mat-list-item>
                      }
                    </mat-list>
                  </div>
                </mat-tab>
                <mat-tab label="Settings">
                  <div class="p-4">
                    @for (setting of getMockSettings(); track setting.id) {
                      <mat-slide-toggle [checked]="setting.enabled" class="mb-4 block">
                        {{setting.label}}
                      </mat-slide-toggle>
                    }
                  </div>
                </mat-tab>
              </mat-tab-group>
            </mat-card-content>
          </mat-card>
        }

        @default {
          <!-- Default List View -->
          <mat-card>
            <mat-card-content>
              <div class="flex justify-between mb-4">
                <div>
                  <button mat-raised-button color="primary">
                    <mat-icon>add</mat-icon>
                    New Item
                  </button>
                </div>
                <div>
                  <button mat-icon-button [matMenuTriggerFor]="viewMenu">
                    <mat-icon>view_list</mat-icon>
                  </button>
                  <mat-menu #viewMenu="matMenu">
                    <button mat-menu-item>
                      <mat-icon>grid_view</mat-icon>
                      Grid View
                    </button>
                    <button mat-menu-item>
                      <mat-icon>view_list</mat-icon>
                      List View
                    </button>
                    <button mat-menu-item>
                      <mat-icon>table_chart</mat-icon>
                      Table View
                    </button>
                  </mat-menu>
                </div>
              </div>

              <table mat-table [dataSource]="getMockTableData()" class="w-full">
                <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef> ID </th>
                  <td mat-cell *matCellDef="let element"> {{element.id}} </td>
                </ng-container>

                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef> Name </th>
                  <td mat-cell *matCellDef="let element"> {{element.name}} </td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef> Status </th>
                  <td mat-cell *matCellDef="let element">
                    <mat-chip [color]="element.status === 'Active' ? 'primary' : 'warn'">
                      {{element.status}}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let element">
                    <button mat-icon-button [matMenuTriggerFor]="actionMenu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #actionMenu="matMenu">
                      <button mat-menu-item [routerLink]="['/test/detail/summary-' + element.id]">
                        <mat-icon>visibility</mat-icon>
                        View Details
                      </button>
                      <button mat-menu-item>
                        <mat-icon>edit</mat-icon>
                        Edit
                      </button>
                      <button mat-menu-item>
                        <mat-icon>delete</mat-icon>
                        Delete
                      </button>
                    </mat-menu>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="['id', 'name', 'status', 'actions']"></tr>
                <tr mat-row *matRowDef="let row; columns: ['id', 'name', 'status', 'actions'];"></tr>
              </table>

              <mat-paginator [length]="100"
                           [pageSize]="10"
                           [pageSizeOptions]="[5, 10, 25, 100]">
              </mat-paginator>
            </mat-card-content>
          </mat-card>
        }
      }
    </div>
  `
})
export class GenericPageComponent {
  searchControl = new FormControl('');
  showFilters = signal(false);
  route = inject(ActivatedRoute);
  isLoading = signal(false);

  randomProgress = Math.floor(Math.random() * 100);

  getPageTitle(): string {
    const segments = this.route.snapshot.url;
    return segments[segments.length - 1]?.path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Page';
  }

  getIconForRoute(): string {
    const path = this.route.snapshot.url.join('/');
    if (path.includes('overview')) return 'dashboard';
    if (path.includes('results')) return 'bar_chart';
    if (path.includes('settings')) return 'settings';
    if (path.includes('summary')) return 'summarize';
    if (path.includes('detail')) return 'details';
    return 'web';
  }

  mockStats = signal([
    { label: 'Total Views', value: Math.floor(Math.random() * 10000), change: 12.5 },
    { label: 'Conversions', value: Math.floor(Math.random() * 1000), change: -5.2 },
    { label: 'Average Time', value: '2m 35s', change: 8.1 },
    { label: 'Bounce Rate', value: '23%', change: -2.3 }
  ]);

  mockTableData() {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `ID-${Math.floor(Math.random() * 1000)}`,
      date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      status: Math.random() > 0.5 ? 'Completed' : 'Pending'
    }));
  }

  getBreadcrumbs() {
    const segments = this.route.snapshot.url;
    let path = '';
    return segments.map(segment => {
      path += `/${segment.path}`;
      return {
        label: segment.path.split('-').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        path
      };
    });
  }

  refreshData() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.mockStats.set([
        { label: 'Total Views', value: Math.floor(Math.random() * 10000), change: Math.floor(Math.random() * 20) - 10 },
        { label: 'Conversions', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 20) - 10 },
        { label: 'Average Time', value: `${Math.floor(Math.random() * 5)}m ${Math.floor(Math.random() * 60)}s`, change: Math.floor(Math.random() * 20) - 10 },
        { label: 'Bounce Rate', value: `${Math.floor(Math.random() * 100)}%`, change: Math.floor(Math.random() * 20) - 10 }
      ]);
      this.isLoading.set(false);
    }, 1000);
  }
  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  getRouteType(): 'overview' | 'detail' | 'list' {
    const path = this.route.snapshot.url.join('/');
    if (path.includes('overview')) return 'overview';
    if (path.includes('detail')) return 'detail';
    return 'list';
  }

  getOverviewCards() {
    return [
      {
        title: 'Active Users',
        subtitle: '2,451 online now',
        icon: 'people',
        iconClass: 'text-blue-500 dark:text-pink-500'
      },
      {
        title: 'Total Revenue',
        subtitle: '$12,543 this month',
        icon: 'payments',
        iconClass: 'text-green-500'
      },
      {
        title: 'Pending Tasks',
        subtitle: '6 require attention',
        icon: 'assignment',
        iconClass: 'text-orange-500'
      }
    ];
  }

  getMockDetails() {
    return [
      { label: 'Created Date', value: '2024-01-15' },
      { label: 'Last Modified', value: '2024-03-20' },
      { label: 'Status', value: 'Active' },
      { label: 'Category', value: 'Test Data' },
      { label: 'Owner', value: 'John Doe' }
    ];
  }

  getMockActivity() {
    return [
      { id: 1, action: 'Updated status', timestamp: '2 hours ago', icon: 'edit' },
      { id: 2, action: 'Added new comment', timestamp: '4 hours ago', icon: 'comment' },
      { id: 3, action: 'Changed category', timestamp: '1 day ago', icon: 'category' }
    ];
  }

  getMockSettings() {
    return [
      { id: 1, label: 'Email Notifications', enabled: true },
      { id: 2, label: 'Auto-save Changes', enabled: false },
      { id: 3, label: 'Public Access', enabled: true }
    ];
  }

  getMockTableData() {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `ID-${1000 + i}`,
      name: `Test Item ${i + 1}`,
      status: Math.random() > 0.5 ? 'Active' : 'Inactive'
    }));
  }

  handleCardClick(card: any) {
    console.log('Card clicked:', card);
    // Add navigation or dialog logic here
  }

}
