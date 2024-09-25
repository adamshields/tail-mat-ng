import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from '@material/material-color-utilities';

import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeManager } from '../../../theme-manager.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  private themeManager = inject(ThemeManager);
  isDark = toSignal(this.themeManager.isDark$);
  color = toSignal(this.themeManager.color$);

  constructor() {
    effect(() => {
      this.generateDynamicTheme(this.isDark(), this.color());
    });
  }

  changeTheme(ev: Event) {
    const inputElement = ev.target as HTMLInputElement;
    this.themeManager.changeColor(inputElement.value);
  }

  generateDynamicTheme(isDark?: boolean, color?: string) {
    if (!color) return;

    let argb;
    try {
      argb = argbFromHex(color);
    } catch (error) {
      // falling to default color if it's invalid color
      argb = argbFromHex('#6750a4');
    }

    const targetElement = document.documentElement;

    // Get the theme from a hex color
    const theme = themeFromSourceColor(argb);

    // Apply theme to root element
    applyTheme(theme, {
      target: targetElement,
      dark: isDark,
      brightnessSuffix: true,
    });

    const styles = targetElement.style;

    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        const propName = styles[key];

        // color utilities generate variables with --md-sys- prefix, we need to change it to --sys
        if (propName.indexOf('--md-sys') === 0) {
          const sysPropName = '--sys' + propName.replace('--md-sys-color', '');
          targetElement.style.setProperty(
            sysPropName,
            targetElement.style.getPropertyValue(propName)
          );
        }
      }
    }
  }
}
