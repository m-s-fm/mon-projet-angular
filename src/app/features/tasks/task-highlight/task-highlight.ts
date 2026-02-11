import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-highlight.html',
  styleUrl: './task-highlight.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHighlight {
  @Input() title = '';
  @Input() description = '';
  @Output() close = new EventEmitter<void>();
}
