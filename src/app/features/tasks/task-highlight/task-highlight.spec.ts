import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlight } from './task-highlight';

describe('TaskHighlight', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlight]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskHighlight);

    component = fixture.componentInstance;
  });

  it('devrait afficher le titre dans le DOM', () => {
    component.title = 'Ma tâche';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent)
      .toContain('Ma tâche');
  });
});
