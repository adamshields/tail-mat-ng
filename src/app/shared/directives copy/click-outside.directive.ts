import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class AutoTitleStrategy extends TitleStrategy {
  private readonly appName = 'Adam';
  private lastTitle = '';

  override updateTitle(routerState: RouterStateSnapshot): void {
    if (!routerState) return;

    // Get current activated route data
    const routeLabel = this.findLabel(routerState);
    if (routeLabel) {
      this.setTitle(routeLabel);
      return;
    }

    // Fallback to formatted last segment if no route data found
    const lastSegment = routerState.url.split('/').filter(Boolean).at(-1) ?? '';
    this.setTitle(this.formatTitle(lastSegment));
  }

  private findLabel(state: RouterStateSnapshot): string | undefined {
    let currentRoute = state.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      // Look for route with label data
      if (currentRoute.data['label']) {
        return currentRoute.data['label'];
      }
    }
    return undefined;
  }

  private setTitle(pageTitle: string): void {
    const fullTitle = `${pageTitle} | ${this.appName}`;
    if (this.lastTitle !== fullTitle) {
      this.lastTitle = fullTitle;
      document.title = fullTitle;
    }
  }

  private formatTitle(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
