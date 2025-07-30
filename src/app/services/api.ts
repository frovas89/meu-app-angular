import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definindo uma interface para o nosso objeto para ter um código mais limpo e tipado
export interface ApiObject {
  id: string;
  name: string;
  data?: {
    color?: string;
    capacity?: string;
    price?: number;
    generation?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'https://api.restful-api.dev/objects';

  constructor(private http: HttpClient) { }

  public getObjects(): Observable<ApiObject> {
    return this.http.get<ApiObject>(this.apiUrl);
  }

  getObjectById(id: string): Observable<ApiObject> {
    return this.http.get<ApiObject>(`${this.apiUrl}/${id}`);
  }

  createObject(objectData: Omit<ApiObject, 'id'>): Observable<ApiObject> {
    return this.http.post<ApiObject>(this.apiUrl, objectData);
  }

  updateObject(id: string, objectData: Omit<ApiObject, 'id'>): Observable<ApiObject> {
    return this.http.put<ApiObject>(`${this.apiUrl}/${id}`, objectData);
  }

  deleteObject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

