// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<any> {
    return this.http.get(`${this.apiUrl}/plants`);
  }

  getNutrientSolution(): Observable<any> {
    return this.http.get(`${this.apiUrl}/nutrient-solution`);
  }

  getEnvironment(): Observable<any> {
    return this.http.get(`${this.apiUrl}/environment`);
  }

  getLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logs`);
  }

  sendControlCommand(command: string, plantId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/control`, { command, plantId });
  }
}
