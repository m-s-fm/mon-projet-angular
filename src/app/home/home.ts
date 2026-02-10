import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TaskService } from '../task.service';
import { TaskStatsComponent } from '../features/tasks/task-stats/task-stats';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, TaskStatsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
}
