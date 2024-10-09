import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PlantCardComponent } from '../plant-card/plant-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, PlantCardComponent],
})
export class DashboardComponent implements OnInit {
  plants: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants() {
    this.apiService.getPlants().subscribe((data) => {
      this.plants = data.map((plant) => ({
        ...plant,
        image: 'assets/images/default-plant.png',
      }));
    });
  }

  updatePlantName(updatedData: { id: number; name: string }) {
    const plant = this.plants.find((p) => p.id === updatedData.id);
    if (plant) plant.name = updatedData.name;
  }
}
