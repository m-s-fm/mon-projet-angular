import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private taskService = inject(TaskService);

  tasks$ = this.taskService.getTasks();

  count = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  add(title: string) {
    if (!title) return;

    this.taskService.addTask(title);

    this.tasks$ = this.taskService.getTasks();
  }
}
