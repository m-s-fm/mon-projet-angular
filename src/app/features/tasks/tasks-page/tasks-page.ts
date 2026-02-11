import { Component, inject, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent {
  private taskService = inject(TaskService);
  private viewContainerRef = inject(ViewContainerRef);
  private currentComponentRef: any = null;

  tasks$ = this.taskService.getTasks();

  addTask(title: string) {
    if (!title) return;
    this.taskService.addTask(title).subscribe(() => {
      this.tasks$ = this.taskService.getTasks();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks$ = this.taskService.getTasks();
    });
  }

  toggleComplete(task: any) {
    this.taskService.toggleCompleted(task.id);
    this.tasks$ = this.taskService.getTasks();
  }

  highlightTask(task: any) {
    this.taskService.toggleHighlight(task.id);
    this.tasks$ = this.taskService.getTasks();

    if (task.isHighlighted) {
      this.showHighlightModal(task);
    }
  }

  editTask(task: any) {
    this.clearDynamicComponent();
    const componentRef = this.viewContainerRef.createComponent(TaskEdit);
    this.currentComponentRef = componentRef;
    componentRef.instance.title = task.title;
    componentRef.instance.description = task.description;
    componentRef.instance.taskId = task.id;

    componentRef.instance.onSave.subscribe((newData: { id: number, title: string, description: string }) => {
      this.taskService.updateTask(newData.id, newData.title, newData.description);
      this.tasks$ = this.taskService.getTasks();
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
    componentRef.instance.title = task.title;
    componentRef.instance.description = task.description;
    componentRef.instance.close.subscribe(() => this.clearDynamicComponent());
  }

  private clearDynamicComponent() {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
      this.currentComponentRef = null;
    }
  }
}
