import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { NotificationService } from './core/services/notification.service';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isHighlighted: boolean;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private notificationService = inject(NotificationService);

  private initialTasks: TaskItem[] = [
    { id: 1, title: 'Apprendre Angular Tache 1', description: 'Descritption de la tache 1', isHighlighted: false, completed: false },
    { id: 2, title: 'Titre tache 2  ', description: 'Description de la tache 2', isHighlighted: false, completed: false },
    { id: 3, title: 'Finir le code ', description: 'Description de la tache 3', isHighlighted: false, completed: false },
  ];

  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.initialTasks);

  tasks$ = this.tasksSubject.asObservable();

  nextId = 4;

  getTasks(): TaskItem[] {
    return this.tasksSubject.value;
  }

  clearTasks(): void {
    this.tasksSubject.next([]);
    this.nextId = 1;
  }

  addTask(newTitle: string) {
    const currentTasks = this.tasksSubject.value;
    const newTask: TaskItem = {
      id: this.nextId++,
      title: newTitle,
      description: 'Aucune description',
      isHighlighted: false,
      completed: false
    };

    this.tasksSubject.next([...currentTasks, newTask]);

    return of(newTask).pipe(
      tap(() => this.notificationService.show('Tâche ajoutée avec succès !', 'success'))
    );
  }

  deleteTask(id: number) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(t => t.id !== id);
    this.tasksSubject.next(updatedTasks);

    return of(id).pipe(
      tap(() => this.notificationService.show('Tâche supprimée.', 'info'))
    );
  }

  toggleHighlight(id: number) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, isHighlighted: !task.isHighlighted } : task
    );
    const sorted = this.sortTasks(updatedTasks);
    this.tasksSubject.next(sorted);
  }

  toggleCompleted(id: number) {
    this.toggleTask(id);
  }

  toggleTask(id: number) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  updateTask(id: number, newTitle: string, newDescription: string) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    );
    this.tasksSubject.next(updatedTasks);
    this.notificationService.show('Tâche mise à jour', 'success');
  }

  private sortTasks(tasks: TaskItem[]): TaskItem[] {
    return [...tasks].sort((a, b) => {
      if (a.isHighlighted === b.isHighlighted) return 0;
      return a.isHighlighted ? -1 : 1;
    });
  }
}
