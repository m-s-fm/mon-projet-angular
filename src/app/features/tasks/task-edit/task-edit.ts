import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-edit',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-edit.html',
    styleUrl: './task-edit.css',
})
export class TaskEdit {
    @Input() task: any;
    @Output() save = new EventEmitter<{ title: string, description: string }>();
    @Output() close = new EventEmitter<void>();

    editedTitle = '';
    editedDescription = '';

    ngOnInit() {
        if (this.task) {
            this.editedTitle = this.task.title;
            this.editedDescription = this.task.description || '';
        }
    }

    onSave() {
        this.save.emit({
            title: this.editedTitle,
            description: this.editedDescription
        });
    }
}
