import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import * as backup_data from '../../assets/data/dishes.json';

interface Steps {
  number: number,
  title: string,
  description: string
}

interface Ingredients {
  name: string,
  quantity: string
}

export interface Dish {
  id: number;
  image: string;
  video: string;
  name: string;
  discription: string;
  ingredients: Array<Ingredients>;
  optional_ingredients: Array<Ingredients>;
  apparatus: Array<string>;
  tags: Array<string>;
  time: string;
  steps: Array<Steps>;
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
  providers: [ApiService]
})
export class DishComponent {

  private dish_id: number
  dish: Dish
  display_media: SafeResourceUrl
  displayedColumns: string[] = ['name', 'quantity'];
  constructor(private route: ActivatedRoute, private api: ApiService, public sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => this.dish_id = params.id)
    this.getDishDetails(this.dish_id)
  }

  getDishDetails = (dish_id: number) => {
    this.api.getDishDetails(dish_id).subscribe(
      data => {
        this.dish = data;
      },
      error => {
        console.log(error);
        let dishes: Dish = backup_data['default']
        for (let i in dishes) {
          if (dishes[i].id == dish_id) {
            this.dish = dishes[i];
            if (dishes[i].video)
              this.display_media = this.sanitizer.bypassSecurityTrustResourceUrl(dishes[i].video);
            else
              this.display_media = this.sanitizer.bypassSecurityTrustResourceUrl(dishes[i].image);
            break;
          }
        }
      })
  }

  afterExpandScroll() {
    let prevScroll: number = 0,
      scrollStep: number = window.scrollY / 5,
      scrollInterval = setInterval(function () {
        if (window.scrollY != prevScroll) {
          prevScroll = window.scrollY;
          window.scrollBy(0, scrollStep);
        }
        else clearInterval(scrollInterval);
      }, 15);
  }

  // Move Between cooking steps
  onStep = 0;
  setStep(index: number) { this.onStep = index; }
  nextStep() { this.onStep++; }
  prevStep() { this.onStep--; }
}
