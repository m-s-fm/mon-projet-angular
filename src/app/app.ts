import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. Import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 2. Ajout aux imports
  templateUrl: './app.html', // Vérifie que cela pointe bien vers app.html
  styleUrl: './app.css',
})
export class App {
  title = 'mon-projet-angular';
}
