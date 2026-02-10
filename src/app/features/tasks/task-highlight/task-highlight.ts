import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-highlight.html',
  styleUrl: './task-highlight.css',
})
export class TaskHighlight {
  @Input() task: any;
  @Output() close = new EventEmitter<void>();
  title = '';
}
