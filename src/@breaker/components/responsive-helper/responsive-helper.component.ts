import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-responsive-helper',
    templateUrl: './responsive-helper.component.html',
    styleUrls: ['./responsive-helper.component.scss'],
    standalone: true,
    imports: [CommonModule,],
})
export class ResponsiveHelperComponent implements OnInit {
  public env: any = environment;

  ngOnInit(): void {
    console.log('ResponsiveHelperComponent');
  }
}
