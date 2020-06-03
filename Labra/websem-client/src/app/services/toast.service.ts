import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {}

  sendToast(sev: string, sum: string, det: string ) {
    this.messageService.add({severity: sev, summary: sum, detail: det});
  }

  clear() {
    this.messageService.clear();
  }
}
