import { Component } from '@angular/core';
import { CustomCardComponent } from "../../../@breaker/components/custom-card/custom-card.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CustomCardComponent, MatIconModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}
