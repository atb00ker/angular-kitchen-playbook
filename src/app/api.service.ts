import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { IDish } from './app.interface';

@Injectable()
export class ApiService {

  private baseUrl = "http://127.0.0.1:8000"
  private baseJsonPath = "./assets/data/"
  private httpheaders = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getAllDishes(): Observable<IDish[]> {
    // Returns the list of all the dishes
    return this.http.get<IDish[]>(this.baseUrl + '/dishes/', { headers: this.httpheaders })
      .pipe(catchError(error => {
        console.log(error);
        let backup_data = this.http.get<IDish[]>(this.baseJsonPath + "dishes.json");
        return backup_data;
      }
      ));
  }

  getDishDetails(dish_id): Observable<IDish> {
    // Returns the details about the dish with `dish_id`
    return this.http.get<IDish>(this.baseUrl + '/dish/' + dish_id, { headers: this.httpheaders })
      .pipe(catchError(error => {
        console.error(error);
        let backup_dish: IDish;
        return this.getAllDishes()
          .pipe(map(
            data => {
              for (let i in data) {
                if (data[i].id == dish_id) {
                  backup_dish = data[i];
                  break;
                }
              }
              console.log(backup_dish);
              return backup_dish;
            },
            internal_error => console.log(internal_error)
          ));
      }));
  }
}
