import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DishComponent } from './dish/dish.component';

export class AppRoutes {
  public static home = 'home';
  public static about = 'about';
  public static dish = 'dish/:id';
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  { path: AppRoutes.dish, component: DishComponent },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent, DishComponent]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
