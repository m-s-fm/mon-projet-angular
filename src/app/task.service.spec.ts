import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

import { NotificationService } from './core/services/notification.service';

describe('Task Service', () => {
    let service: TaskService;
    let mockNotificationService: any;

    beforeEach(() => {
        mockNotificationService = {
            show: jasmine.createSpy('show'),
            clear: jasmine.createSpy('clear')
        };

        TestBed.configureTestingModule({
            providers: [
                TaskService,
                { provide: NotificationService, useValue: mockNotificationService }
            ]
        });

        service = TestBed.inject(TaskService);
        service.clearTasks();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait ajouter une tâche', () => {
        service.addTask('Apprendre les tests');

        const tasks = service.getTasks();
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe('Apprendre les tests');
        expect(tasks[0].completed).toBe(false);
    });

    it('devrait supprimer une tâche', () => {
        service.addTask('Tâche temporaire');
        const taskId = service.getTasks()[0].id;

        service.deleteTask(taskId);

        expect(service.getTasks().length).toBe(0);
    });

    it('devrait marquer une tâche comme terminée', () => {
        service.addTask('Tâche à terminer');
        const taskId = service.getTasks()[0].id;

        service.toggleTask(taskId);

        const task = service.getTasks()[0];
        expect(task.completed).toBe(true);
    });

    it('devrait mettre à jour une tâche', () => {
        service.addTask('Tâche à mettre à jour');
        const taskId = service.getTasks()[0].id;

        service.updateTask(taskId, 'Nouveau titre', 'Nouvelle description');

        const task = service.getTasks()[0];
        expect(task.title).toBe('Nouveau titre');
        expect(task.description).toBe('Nouvelle description');
    });

    it('devrait mettre en avant une tâche', () => {
        service.addTask('Tâche normale');
        const taskId = service.getTasks()[0].id;

        service.toggleHighlight(taskId);

        const task = service.getTasks()[0];
        expect(task.isHighlighted).toBe(true);
    });

    it('devrait trier les tâches mises en avant en premier', () => {
        service.addTask('Tâche 1');
        service.addTask('Tâche 2');
        const task2Id = service.getTasks()[1].id;

        // Highlight the second task
        service.toggleHighlight(task2Id);

        const tasks = service.getTasks();
        expect(tasks[0].title).toBe('Tâche 2'); // Should be first now
        expect(tasks[1].title).toBe('Tâche 1');
    });
});
