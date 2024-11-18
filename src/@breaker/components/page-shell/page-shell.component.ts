// page-shell.component.ts
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../../mat-index';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavigationService } from '../../../app/core/services/navigation.service';
import { APP_CONFIG } from '../../../app/core/configs/app.config';
import { NavItem } from '../../../app/core/models/navigation.types';


@Component({
 selector: 'app-page-shell',
 standalone: true,
 imports: [CommonModule, ...MaterialModules],
 template: `

   <div class="mb-4">
     <h1 class="text-2xl font-bold">{{getTitle()}}</h1>
   </div>
   <ng-content></ng-content>

`
})
export class PageShellComponent {
@Input({ required: true }) currentUrl!: string;
@Input({ required: true }) navigationItems: NavItem[] = [];

private titleService = inject(Title);

getTitle(): string {
 const urlParts = this.currentUrl.split('/');
 let pageTitle = '';

 // Special handling for applications section
 if (urlParts[1] === 'applications') {
   if (urlParts.length === 5 && urlParts[3] === 'designs') {
     pageTitle = `Design Details - ${urlParts[4]}`;
   } else if (urlParts.length === 3) {
     pageTitle = `Application Details - ${urlParts[2]}`;
   } else {
     pageTitle = 'Applications';
   }
 } else {
   // Get title from passed navigation items
   const currentNavItem = this.navigationItems
     .find(item => item.path.includes(urlParts[1]));
   pageTitle = currentNavItem?.label || 'Dashboard';
 }

 // Update browser tab title
 this.titleService.setTitle(
   `${APP_CONFIG.name}${APP_CONFIG.titleSeparator}${pageTitle}`
 );

 return pageTitle;
}
}
