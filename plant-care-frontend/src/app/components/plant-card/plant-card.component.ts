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

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PlantCardComponent implements OnInit, AfterViewInit {
  @Input() plant: any;
  @Output() nameUpdated = new EventEmitter<{ id: number; name: string }>();

  editingName = false;
  updatedName = '';
  chart: any;
  chartData = [45, 60, 55, 70, 65, 75];

  ngOnInit() {
    this.updatedName = this.plant.name;
  }

  ngAfterViewInit() {
    this.chart = new Chart(`chart-${this.plant.id}`, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
          {
            label: 'Soil Moisture (%)',
            data: this.chartData,
            borderColor: '#3e95cd',
            fill: false,
          },
        ],
      },
      options: {
        responsive: false, // Disable responsiveness
        maintainAspectRatio: false, // Prevent aspect ratio lock
        scales: {
          x: { display: true },
          y: { display: true },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  startEditing() {
    this.editingName = true;
    this.updatedName = this.plant.name;
  }

  saveName() {
    this.editingName = false;
    if (this.updatedName && this.updatedName !== this.plant.name) {
      this.nameUpdated.emit({ id: this.plant.id, name: this.updatedName });
    }
  }
}
