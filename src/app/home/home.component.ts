import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { IDish } from '../app.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent {

  dishes: IDish[]

  constructor(private api: ApiService) {
    this.getAllDishes()
  }

  getAllDishes = () => {
    this.api.getAllDishes().subscribe(data => this.dishes = data)
  }
}
