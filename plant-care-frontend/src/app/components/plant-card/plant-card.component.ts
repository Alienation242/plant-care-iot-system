import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

interface PlantData {
  time: string; // Assuming time is stored as a string in 'HH:mm' format
  soilMoisture: number; // Soil moisture level as a number
  temperature: number; // Temperature in degrees
}

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PlantCardComponent implements OnInit, AfterViewInit {
  @Input() plant:
    | {
        id: number;
        name: string;
        image: string;
        soilMoisture: number;
        temperature: number;
        last24Hours: PlantData[];
      }
    | undefined;
  @Output() nameUpdated = new EventEmitter<{ id: number; name: string }>();

  editingName = false;
  updatedName = '';
  chart: any;
  chartData = [45, 60, 55, 70, 65, 75];

  ngOnInit() {
    this.updatedName = this.plant!.name;
  }

  ngAfterViewInit() {
    if (this.plant) {
      this.chart = new Chart(`chart-${this.plant.id}`, {
        type: 'line',
        data: {
          labels: this.plant.last24Hours.map((data) => data.time), // assuming 'time' is in HH:mm format
          datasets: [
            {
              label: 'Soil Moisture (%)',
              data: this.plant.last24Hours.map((data) => data.soilMoisture),
              borderColor: '#3e95cd',
              backgroundColor: 'rgba(62, 149, 205, 0.2)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Temperature (°C)',
              data: this.plant.last24Hours.map((data) => data.temperature),
              borderColor: '#e67e22',
              backgroundColor: 'rgba(230, 126, 34, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true, // or false if you want manual control
          aspectRatio: 2, // Adjust for a better width-to-height ratio
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 10,
                },
                padding: 15, // Increases spacing around legend items
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#555555',
                font: {
                  size: 9, // Smaller font for x-axis
                },
                maxRotation: 45, // Reduces clutter if labels overlap
                autoSkip: true,
                padding: 10,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#e0e0e0',
              },
              ticks: {
                color: '#555555',
                font: {
                  size: 9,
                },
                padding: 10, // More space around y-axis labels
              },
            },
          },
        },
      });
    }
  }

  startEditing() {
    this.editingName = true;
    this.updatedName = this.plant!.name;
  }

  saveName() {
    this.editingName = false;
    if (this.updatedName && this.updatedName !== this.plant?.name) {
      this.nameUpdated.emit({ id: this.plant!.id, name: this.updatedName }); // Use ! if you are sure it won't be null
    }
  }
}
