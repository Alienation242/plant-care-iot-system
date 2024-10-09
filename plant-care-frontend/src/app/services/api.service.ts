import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockData } from './mock-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mockDataUrl = 'assets/mock-data/mock-data.json';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<any[]> {
    return this.http
      .get<MockData>(this.mockDataUrl)
      .pipe(map((data) => data.plantStatus));
  }

  updatePlantName(plantId: number, name: string): Observable<any> {
    return this.http.put(`${this.mockDataUrl}/plants/${plantId}`, { name });
  }
}
