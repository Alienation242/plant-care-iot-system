import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'plant-detail', component: PlantDetailComponent },
  { path: 'schedule', component: ScheduleComponent },
];
