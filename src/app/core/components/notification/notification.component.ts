import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css'
})
export class NotificationComponent {
    notificationService = inject(NotificationService);
    notification$ = this.notificationService.notification$;
}
