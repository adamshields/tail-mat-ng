import { Component } from '@angular/core';
import { CustomCardComponent } from "../../../@breaker/components/custom-card/custom-card.component";
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from "../../../@breaker/components/dialog/dialog.component";
import { TabsComponent } from "../../../@breaker/components/tabs/tabs.component";
import { TableComponent } from "../../../@breaker/components/table/table.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CustomCardComponent, MatIconModule, DialogComponent, TabsComponent, TableComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}
