import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  get<T>(endPoint: string): Observable<T> {
    console.log("get"+`${this.BASE_URL}${endPoint}`);
    return this.http.get<T>(`${this.BASE_URL}${endPoint}`)
  }

  post<T>(endPoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}${endPoint}`, body);
  }

  put<T>(endPoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}${endPoint}`, body);
  }

  delete<T>(endPoint: string): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}${endPoint}`)
  }
  
}
