
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TasksPageComponent } from './tasks-page';
import { TaskService } from '../../../task.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Security - XSS Protection', () => {
    let component: TasksPageComponent;
    let fixture: ComponentFixture<TasksPageComponent>;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask']);
        // Mock getTasks to return a task with malicious content
        spy.getTasks.and.returnValue(of([
            {
                id: 999,
                title: '<script>alert("XSS")</script>Malicious Task',
                description: '<img src=x onerror=alert(1)>',
                isHighlighted: false,
                completed: false
            }
        ]));

        await TestBed.configureTestingModule({
            imports: [TasksPageComponent],
            providers: [{ provide: TaskService, useValue: spy }]
        }).compileComponents();

        fixture = TestBed.createComponent(TasksPageComponent);
        component = fixture.componentInstance;
        taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
        fixture.detectChanges();
    });

    it('should escape HTML in task title and description', () => {
        const taskRows = fixture.debugElement.queryAll(By.css('.task-row'));
        expect(taskRows.length).toBe(1);

        const titleEl = taskRows[0].query(By.css('.task-title')).nativeElement;
        const descEl = taskRows[0].query(By.css('.task-desc')).nativeElement;

        // Angular should interpolate string as text, not HTML
        expect(titleEl.textContent).toContain('<script>alert("XSS")</script>');
        expect(titleEl.innerHTML).not.toContain('<script>');
        // Note: innerHTML usually escapes < to &lt; so checking it doesn't contain the raw tag is a good check. 
        // Actually, textContent will show the tag as text. innerHTML will show &lt;script&gt;...
        // If it was interpreted as HTML, innerHTML would (potentially) contain the script tag or be empty strict sanitization, 
        // but textContent would NOT show the brackets.

        // Better check: The <script> tag should NOT be present in the DOM as an element.
        expect(titleEl.querySelector('script')).toBeNull();
        expect(descEl.querySelector('img')).toBeNull();

        // Verify the text is rendered literally
        expect(titleEl.innerText).toContain('<script>alert("XSS")</script>');
    });
});
