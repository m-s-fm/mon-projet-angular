import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NotificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit notification on show', (done) => {
        service.notification$.subscribe(notification => {
            if (notification) {
                expect(notification.message).toBe('Test Message');
                expect(notification.type).toBe('success');
                done();
            }
        });

        service.show('Test Message', 'success');
    });

    it('should clear notification', (done) => {
        service.show('Test', 'info');
        service.clear();

        service.notification$.subscribe(notification => {
            expect(notification).toBeNull();
            done();
        });
    });
});
