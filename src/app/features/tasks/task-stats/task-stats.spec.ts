import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskStatsComponent } from './task-stats';
import { TaskService } from '../../../task.service';
import { BehaviorSubject } from 'rxjs';

describe('TaskStatsComponent', () => {
    let component: TaskStatsComponent;
    let fixture: ComponentFixture<TaskStatsComponent>;
    let mockTaskService: any;
    let tasksSubject: BehaviorSubject<any[]>;

    beforeEach(async () => {
        // Setup Mock Service with fake data for stats
        tasksSubject = new BehaviorSubject([
            { id: 1, completed: true },
            { id: 2, completed: false },
            { id: 3, completed: false }
        ]);

        mockTaskService = {
            tasks$: tasksSubject.asObservable()
        };

        await TestBed.configureTestingModule({
            imports: [TaskStatsComponent],
            providers: [
                { provide: TaskService, useValue: mockTaskService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate stats correctly', (done) => {
        component.stats$.subscribe(stats => {
            expect(stats.total).toBe(3);
            expect(stats.completed).toBe(1);
            expect(stats.pending).toBe(2);
            expect(stats.percentage).toBeCloseTo(33.33, 1);
            done();
        });
    });
});
