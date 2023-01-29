import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { VehiclesInfoInterface } from '../types/VehiclesInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiUrl:string = 'http://localhost:8080/all/vehicle';

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

  public getAllVehicles(): Observable<VehiclesInfoInterface[]>{
    return this.http.get<VehiclesInfoInterface[]>(`${this.apiUrl}/all`, { headers: this.headers });
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
