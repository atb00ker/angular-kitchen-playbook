import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Dish } from '../dish/dish.component'
import * as backup_data from '../../assets/data/dishes.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent {

  dishes: Dish[]

  constructor(private api: ApiService) {
    this.getAllDishes()
  }

  getAllDishes = () => {
    this.api.getAllDishes().subscribe(
      data => {
        this.dishes = data;
      },
      error => {
        console.log(error);
        this.dishes = backup_data['default'];
      }
    )
  }
}
