import { Injectable } from '@angular/core';
import { DataService } from '../../shared/data.service';

@Injectable({
  providedIn: 'root',
})
export class EngineersService {
  constructor(private dataService: DataService) {}

  public getEngineers(filter?) {
    const url = `/engineers`;
    return this.dataService.get(`${url}` + (filter ? '?' + filter : ''));
  }
  public getOrdersEngineers(filter?) {
    const url = `/ordersEngineers`;
    return this.dataService.get(`${url}` + (filter ? '?' + filter : ''));
  }

  public sendInvite(body) {
    return this.dataService.post(`/interview/invite`, body);
  }
}
