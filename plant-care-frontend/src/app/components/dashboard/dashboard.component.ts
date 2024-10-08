import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  plants: any[] = [];
  nutrientSolution: any = {};
  environment: any = {};
  logs: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPlantData();
    this.loadNutrientSolutionData();
    this.loadEnvironmentData();
    this.loadLogs();
  }

  loadPlantData(): void {
    this.apiService.getPlants().subscribe((data) => {
      this.plants = data;
    });
  }

  loadNutrientSolutionData(): void {
    this.apiService.getNutrientSolution().subscribe((data) => {
      this.nutrientSolution = data;
    });
  }

  loadEnvironmentData(): void {
    this.apiService.getEnvironment().subscribe((data) => {
      this.environment = data;
    });
  }

  loadLogs(): void {
    this.apiService.getLogs().subscribe((data) => {
      this.logs = data;
    });
  }

  startWatering(plantId: number): void {
    this.apiService
      .sendControlCommand('start_watering', plantId)
      .subscribe((response: any) => {
        console.log(response.message);
        this.loadLogs(); // Refresh logs after action
      });
  }

  isPHOptimal(): boolean {
    return this.nutrientSolution?.pH >= 5.5 && this.nutrientSolution?.pH <= 7.0;
  }

  isECOptimal(): boolean {
    return this.nutrientSolution?.ec >= 1.0 && this.nutrientSolution?.ec <= 2.0;
  }
}
