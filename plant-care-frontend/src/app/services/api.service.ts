import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MockData, PlantStatus } from './mock-data.interface';
import { MockDataService } from './mock-data-generator.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mockDataUrl = 'assets/mock-data/mock-data.json';
  private mockDataCache$ = new BehaviorSubject<MockData | null>(null);

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {
    this.loadMockData();
  }

  private loadMockData() {
    this.http
      .get<MockData>(this.mockDataUrl)
      .pipe(tap((data) => this.mockDataCache$.next(data)))
      .subscribe();
  }
  getPlants(): Observable<any[]> {
    const mockPlants = this.mockDataService.generateMockPlantData();
    return of(mockPlants);
  }

  updatePlantName(
    plantId: number,
    name: string
  ): Observable<PlantStatus | undefined> {
    return new Observable((observer) => {
      const plant = this.getMockPlantById(plantId);
      if (plant) {
        plant.name = name;
        observer.next(plant);
        observer.complete();
      } else {
        observer.error('Plant not found');
      }
    });
  }

  private getMockPlantById(id: number): PlantStatus | undefined {
    const mockData = this.mockDataCache$.getValue();
    return mockData?.plantStatus.find((plant) => plant.id === id);
  }
}
