import { Component, input, signal } from '@angular/core';
import { MenuItem } from '../../data/menu-item.interface';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidenav-menu-item',
  standalone: true,
  imports: [RouterModule, MatListModule, MatIcon],
  templateUrl: './sidenav-menu-item.component.html',
  styleUrl: './sidenav-menu-item.component.scss',
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

  item = input.required<MenuItem>();


  collapsed = input(false);


  nestedMenuOpen = signal(false);


  toggleNested() {
    if (!this.item().subItems) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
