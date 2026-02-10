import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEdit } from './task-edit';

describe('TaskEdit', () => {
    let component: TaskEdit;
    let fixture: ComponentFixture<TaskEdit>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskEdit]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskEdit);
        component = fixture.componentInstance;
        // Mock input
        component.task = { id: 1, title: 'Test Task', description: 'Desc' };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize inputs', () => {
        expect(component.editedTitle).toBe('Test Task');
        expect(component.editedDescription).toBe('Desc');
    });

    it('should emit save event with new data', () => {
        spyOn(component.save, 'emit');

        component.editedTitle = 'New Title';
        component.editedDescription = 'New Desc';
        component.onSave();

        expect(component.save.emit).toHaveBeenCalledWith({
            title: 'New Title',
            description: 'New Desc'
        });
    });

    it('should emit close event', () => {
        spyOn(component.close, 'emit');
        component.onCancel();
        expect(component.close.emit).toHaveBeenCalled();
    });
});
