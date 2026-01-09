import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NotificationService } from './core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private notificationService = inject(NotificationService);

  private tasks = [
    { id: 1, title: 'Apprendre Angular Tache 1', description: 'Descritption de la tache 1', isHighlighted: false, completed: false },
    { id: 2, title: 'Titre tache 2  ', description: 'Description de la tache 2', isHighlighted: false, completed: false },
    { id: 3, title: 'Finir le code ', description: 'Description de la tache 3', isHighlighted: false, completed: false },
  ];

  getTasks() {
    // Sort tasks: highlighted first, then by id (or original order)
    const sortedTasks = [...this.tasks].sort((a, b) => {
      if (a.isHighlighted === b.isHighlighted) return 0;
      return a.isHighlighted ? -1 : 1;
    });
    return of(sortedTasks).pipe(delay(1000));
  }

  addTask(newTitle: string) {
    const newTask = {
      id: this.tasks.length + 1,
      title: newTitle,
      description: 'Aucune description',
      isHighlighted: false,
      completed: false
    };
    this.tasks.push(newTask);

    // Return observable and use tap for side effect
    return of(newTask).pipe(
      tap(() => this.notificationService.show('Tâche ajoutée avec succès !', 'success'))
    );
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);

    return of(id).pipe(
      tap(() => this.notificationService.show('Tâche supprimée.', 'info'))
    );
  }

  toggleHighlight(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isHighlighted = !task.isHighlighted;
    }
  }

  toggleCompleted(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  updateTask(id: number, newTitle: string, newDescription: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      task.description = newDescription;
    }
    this.notificationService.show('Tâche mise à jour', 'success');
  }
}
