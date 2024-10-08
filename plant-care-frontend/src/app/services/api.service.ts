import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mockDataUrl = 'assets/mock-data/mock-data.json';

  constructor(private http: HttpClient) {}

  // Fetch the entire mock data file
  private getMockData(): Observable<any> {
    return this.http.get(this.mockDataUrl);
  }

  // Extract individual data sections from the mock JSON
  getPlants(): Observable<any[]> {
    return this.getMockData().pipe(map((data) => data.plantStatus));
  }

  getNutrientSolution(): Observable<any> {
    return this.getMockData().pipe(map((data) => data.nutrientStatus));
  }

  getEnvironment(): Observable<any> {
    return this.getMockData().pipe(map((data) => data.environment));
  }

  getSystemHealth(): Observable<any> {
    return this.getMockData().pipe(map((data) => data.systemHealth));
  }

  getAlerts(): Observable<any[]> {
    return this.getMockData().pipe(map((data) => data.alerts));
  }

  getLogs(): Observable<any[]> {
    return this.getMockData().pipe(map((data) => data.logs));
  }

  sendControlCommand(command: string, plantId: number): Observable<any> {
    return this.getMockData().pipe(
      map((data) => ({
        message: `Command ${command} sent to Plant ID: ${plantId}`,
      }))
    );
  }
}
