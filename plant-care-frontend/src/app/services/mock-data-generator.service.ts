import { Injectable } from '@angular/core';
import { addHours, format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  generateMockPlantData(plantCount: number = 6): any[] {
    const plants = ['Tomato', 'Basil', 'Cucumber', 'Pepper', 'Lettuce'];

    return plants.map((plant, index) => ({
      id: index + 1,
      name: plant,
      soilMoisture: this.getRandomSoilMoisture(),
      temperature: this.getRandomTemperature(),
      last24Hours: this.generate24HourData(),
      image: `assets/images/${plant.toLowerCase()}.png`,
    }));
  }

  getRandomSoilMoisture(): number {
    return Math.floor(Math.random() * 50) + 30; // Random between 30 and 80
  }

  getRandomTemperature(): number {
    return Math.floor(Math.random() * 15) + 20; // Random between 20°C and 35°C
  }

  generate24HourData(): {
    time: string;
    soilMoisture: number;
    temperature: number;
  }[] {
    const data = [];
    const currentTime = new Date();

    for (let i = 0; i < 24; i++) {
      const time = addHours(currentTime, -i);
      data.push({
        time: format(time, 'HH:mm'),
        soilMoisture: this.getRandomSoilMoisture(),
        temperature: this.getRandomTemperature(),
      });
    }

    return data.reverse();
  }
}
