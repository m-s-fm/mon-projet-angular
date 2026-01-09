import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'; // Added DecimalPipe for percentage formatting
import { map } from 'rxjs/operators';
import { TaskService } from '../../../task.service';

@Component({
    selector: 'app-task-stats',
    standalone: true,
    imports: [AsyncPipe, CommonModule, DecimalPipe],
    templateUrl: './task-stats.html',
    styleUrl: './task-stats.css'
})
export class TaskStatsComponent {
    private taskService = inject(TaskService);

    stats$ = this.taskService.getTasks().pipe(
        map(tasks => {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const pending = total - completed;
            const percentage = total > 0 ? (completed / total) * 100 : 0;

            return {
                total,
                completed,
                pending,
                percentage
            };
        })
    );
}
