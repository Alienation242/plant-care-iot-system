import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getSensorData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sensor-data`);
  }

  sendControlCommand(command: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/control`, { command });
  }
}
