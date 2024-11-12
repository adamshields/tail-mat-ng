import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './containers.component.html',
  styleUrl: './containers.component.scss'
})
export class ContainersComponent {

}
