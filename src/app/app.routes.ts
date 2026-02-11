import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/routes').then((m) => m.TASKS_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/routes').then((m) => m.ABOUT_ROUTES),
  },
];
