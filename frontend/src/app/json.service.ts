import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  // private jsonDataUrl = 'assets/data.json';
  private apiUrl = 'http://localhost:3000/api/v1/search';

  constructor(private http: HttpClient) {}

  searchWithTerm(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { searchTerm };
    return this.http
      .post<any>(`${this.apiUrl}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    //  handling Errors
    console.error('API Error:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
