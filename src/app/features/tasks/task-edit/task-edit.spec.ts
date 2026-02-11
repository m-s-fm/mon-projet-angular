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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize editedTitle and editedDescription from inputs', () => {
        component.title = 'Test Title';
        component.description = 'Test Desc';
        component.ngOnInit(); // Manually call ngOnInit as inputs changed after first detectChanges
        expect(component.editedTitle).toBe('Test Title');
        expect(component.editedDescription).toBe('Test Desc');
    });

    it('should emit onSave with correct data when save is called', () => {
        spyOn(component.onSave, 'emit');
        component.taskId = 123;
        component.editedTitle = 'New Title';
        component.editedDescription = 'New Desc';
        component.save();
        expect(component.onSave.emit).toHaveBeenCalledWith({
            id: 123,
            title: 'New Title',
            description: 'New Desc'
        });
    });

    it('should emit close when close button is clicked', () => {
        spyOn(component.close, 'emit');
        // Verify via template interaction or direct method call?
        // Let's verify via method call first since we don't have a direct 'close()' method in TS, but template calls close.emit() directly.
        // Wait, template calls `close.emit()`.
        // I can trigger the event from the template.
        // But let's check if there is a method? No.
        // So let's check if the element exists and clicking it emits.
        const closeBtn = fixture.nativeElement.querySelector('.close-btn');
        closeBtn.click();
        expect(component.close.emit).toHaveBeenCalled();
    });
});
