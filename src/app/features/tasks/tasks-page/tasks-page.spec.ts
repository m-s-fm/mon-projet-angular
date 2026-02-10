import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPageComponent } from './tasks-page';
import { TaskService } from '../../../task.service';
import { of, BehaviorSubject } from 'rxjs';

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;
  let mockTaskService: any;
  let tasksSubject: BehaviorSubject<any[]>;

  beforeEach(async () => {
    // Setup Mock Service
    tasksSubject = new BehaviorSubject([{ id: 1, title: 'Test Task', isHighlighted: false, completed: false }]);
    mockTaskService = {
      tasks$: tasksSubject.asObservable(),
      getTasks: () => tasksSubject.value,
      addTask: jasmine.createSpy('addTask').and.returnValue(of({})),
      deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of({})),
      toggleCompleted: jasmine.createSpy('toggleCompleted'),
      toggleHighlight: jasmine.createSpy('toggleHighlight'),
      updateTask: jasmine.createSpy('updateTask')
    };

    await TestBed.configureTestingModule({
      imports: [TasksPageComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask on service when addTask is called', () => {
    component.addTask('New Task');
    expect(mockTaskService.addTask).toHaveBeenCalledWith('New Task');
  });

  it('should call deleteTask on service', () => {
    component.deleteTask(1);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1);
  });

  it('should call toggleCompleted on service', () => {
    component.toggleComplete({ id: 1 });
    expect(mockTaskService.toggleCompleted).toHaveBeenCalledWith(1);
  });

  it('should call toggleHighlight on service', () => {
    component.highlightTask({ id: 1, isHighlighted: false });
    expect(mockTaskService.toggleHighlight).toHaveBeenCalledWith(1);
  });
});
