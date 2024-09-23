import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LayoutService } from '../layout.service';


@Injectable({providedIn: 'root'})
export class LayoutRoutingStrategy extends TitleStrategy {
  constructor(
    private titleService: Title,
    private layoutService: LayoutService
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.titleService.setTitle(`MyApp - ${title}`);
    }

    const layout = snapshot.root.firstChild?.data['layout'];
    if (layout) {
      this.layoutService.setLayout(layout);
    }
  }
}
