import { Component, inject, ViewContainerRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../../../task.service';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { TaskEdit } from '../task-edit/task-edit';
import '@angular/compiler';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPageComponent {
  private taskService = inject(TaskService);
  private viewContainerRef = inject(ViewContainerRef);
  private currentComponentRef: any = null;

  tasks$ = this.taskService.tasks$;

  addTask(title: string) {
    if (!title) return;
    this.taskService.addTask(title).subscribe();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe();
  }

  toggleComplete(task: any) {
    this.taskService.toggleCompleted(task.id);
  }

  highlightTask(task: any) {
    this.taskService.toggleHighlight(task.id);

    if (task.isHighlighted) {
      this.showHighlightModal(task);
    }
  }

  editTask(task: any) {
    this.clearDynamicComponent();
    const componentRef = this.viewContainerRef.createComponent(TaskEdit);
    this.currentComponentRef = componentRef;
    componentRef.instance.task = task;

    componentRef.instance.save.subscribe((newData: { title: string, description: string }) => {
      this.taskService.updateTask(task.id, newData.title, newData.description);
      this.clearDynamicComponent();
    });

    componentRef.instance.close.subscribe(() => {
      this.clearDynamicComponent();
    });
  }

  private showHighlightModal(task: any) {
    this.clearDynamicComponent();
    const componentRef = this.viewContainerRef.createComponent(TaskHighlight);
    this.currentComponentRef = componentRef;
    componentRef.instance.task = task;
    componentRef.instance.close.subscribe(() => this.clearDynamicComponent());
  }

  private clearDynamicComponent() {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
      this.currentComponentRef = null;
    }
  }
}
