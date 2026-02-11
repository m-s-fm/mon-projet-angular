import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NotificationComponent } from './core/components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'mon-projet-angular';
}
