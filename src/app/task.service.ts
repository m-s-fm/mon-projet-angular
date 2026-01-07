import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = [
    { id: 1, title: 'Apprendre Angular' },
    { id: 2, title: 'Créer TaskBoard Pro ' },
    { id: 3, title: 'Maîtriser les Observables ' },
  ];

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }

  addTask(newTitle: string) {
    const newTask = {
      id: this.tasks.length + 1,
      title: newTitle,
    };
    this.tasks.push(newTask);
  }
}
