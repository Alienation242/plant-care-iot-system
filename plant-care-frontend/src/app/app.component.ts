import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  template: '<app-dashboard></app-dashboard>',
  standalone: true,
  imports: [DashboardComponent],
})
export class AppComponent {}
