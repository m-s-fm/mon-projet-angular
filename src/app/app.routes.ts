import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page par défaut (Home)
  { path: 'about', component: AboutComponent }, // Page About
];
