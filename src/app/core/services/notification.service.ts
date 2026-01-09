import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationSubject = new BehaviorSubject<Notification | null>(null);
    notification$ = this.notificationSubject.asObservable();

    show(message: string, type: 'success' | 'error' | 'info' = 'success') {
        this.notificationSubject.next({ message, type });

        // Auto-clear after 3 seconds
        setTimeout(() => {
            this.clear();
        }, 3000);
    }

    clear() {
        this.notificationSubject.next(null);
    }
}
