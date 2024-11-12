// src/app/shared/components/sidenav-menu-item/sidenav-menu-item.component.ts
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavItem } from '../../../core/models/navigation.types';


@Component({
  selector: 'app-sidenav-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, MatListModule, MatIcon],
  template: `
    <a
      mat-list-item
      class="menu-item"
      [routerLink]="[item().path]"
      (click)="toggleNested()"
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive"
      [activated]="rla.isActive"
    >
      <mat-icon
        [fontSet]="rla.isActive ? 'material-icons': 'material-icons-outlined'"
        matListItemIcon
      >{{item().icon}}</mat-icon>

      @if (!collapsed()) {
        <span matListItemTitle>{{item().label}}</span>
      }

      @if (item().children?.length) {
        <span matListItemMeta>
          @if(nestedMenuOpen()) {
            <mat-icon>expand_less</mat-icon>
          } @else {
            <mat-icon>expand_more</mat-icon>
          }
        </span>
      }
    </a>

    @if (item().children?.length && nestedMenuOpen()) {
      <div @expandContractMenu>
        @for (child of item().children; track child.id) {
          <a
            mat-list-item
            class="menu-item"
            [class.indented]="!collapsed()"
            [routerLink]="[child.path]"
            routerLinkActive
            #rla="routerLinkActive"
            [activated]="rla.isActive"
          >
            <mat-icon
              [fontSet]="rla.isActive ? 'material-icons': 'material-icons-outlined'"
              matListItemIcon
            >{{child.icon}}</mat-icon>

            @if (!collapsed()) {
              <span matListItemTitle>{{child.label}}</span>
            }
          </a>
        }
      </div>
    }
  `,
  styles: [`
:host * {
  transition: all 500ms ease-in-out;
}

.menu-item {
  border-left: 5px solid;
  border-left-color: rgba(0, 0, 0, 0);
  border-radius: 0%;
}
.selected-menu-item {
  border-left-color: var(--on-primary);
  background: rgba(0, 0, 0, 0.05);
}

.indented {
  --mat-list-list-item-leading-icon-start-space: 48px;
}

mat-sidenav-container {
  height: calc(100vh - 64px);
}
mat-sidenav,
mat-sidenav-content {
  transition: all 500ms ease-in-out;
}

  `],
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class SidenavMenuItemComponent {
  constructor() {
    effect(() => {
      console.log('collapsed state changed sidenav menu item:', this.collapsed());
    });
  }

  item = input.required<NavItem>();
  collapsed = input<boolean>(false);

  nestedMenuOpen = signal(false);

  toggleNested() {
    if (!this.item().children?.length) {
      return;
    }
    this.nestedMenuOpen.update(v => !v);
  }
}


