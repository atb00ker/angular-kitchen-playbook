import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://127.0.0.1:8000"
  httpheaders = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(private http: HttpClient) { }

  getAllDishes(): Observable<any> {
    return this.http.get(this.baseUrl + '/dishes', { headers: this.httpheaders })
  }

  getDishDetails(dish_id): Observable<any> {
    return this.http.get(this.baseUrl + '/dish/' + dish_id, { headers: this.httpheaders })
  }
}
