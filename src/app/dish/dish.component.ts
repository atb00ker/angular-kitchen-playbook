import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { IDish } from '../app.interface';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
  providers: [ApiService]
})
export class DishComponent {

  private dish_id: number
  dish: IDish
  displayedColumns: string[] = ['name', 'quantity'];
  constructor(private route: ActivatedRoute, private api: ApiService, public sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => this.dish_id = params.id)
    this.api.getDishDetails(this.dish_id).subscribe(data => this.dish = data)
  }

  // Move Between cooking steps
  onStep = 0;
  setStep(index: number) { this.onStep = index; }
  nextStep() { this.onStep++; }
  prevStep() { this.onStep--; }

  // Keep the scrollbar at the bottom of the page when
  // the "steps" accordion is opened.
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
}
