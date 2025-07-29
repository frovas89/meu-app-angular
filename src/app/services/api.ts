import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'https://api.restful-api.dev/objects';

  constructor(private http: HttpClient) { }

  public getObjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
