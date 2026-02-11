import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-edit',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-edit.html',
    styleUrl: './task-edit.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEdit {
    @Input() title = '';
    @Input() description = '';
    @Input() taskId = 0;
    @Output() onSave = new EventEmitter<{ id: number, title: string, description: string }>();
    @Output() close = new EventEmitter<void>();

    editedTitle = '';
    editedDescription = '';

    ngOnInit() {
        this.editedTitle = this.title;
        this.editedDescription = this.description;
    }

    save() {
        this.onSave.emit({
            id: this.taskId,
            title: this.editedTitle,
            description: this.editedDescription
        });
    }
}
