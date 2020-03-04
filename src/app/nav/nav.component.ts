import { Component } from '@angular/core';
import { AppRoutes } from '../app-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  home_path = '/' + AppRoutes.home
  about_path = '/' + AppRoutes.about
}
