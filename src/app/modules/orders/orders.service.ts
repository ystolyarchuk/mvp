import { Injectable } from '@angular/core';
import { DataService } from '../../shared/data.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private dataService: DataService) {}

  public getOrders() {
    return this.dataService.get('/orders');
  }
  public getOrderById(id: number) {
    return this.dataService.get(`/orders/${id}`);
  }
  public deleteOrder(id: number) {
    return this.dataService.delete(`/orders/${id}`);
  }
  public createOrder(body) {
    return this.dataService.post('/orders', body);
  }
  public updateOrder(id: number, body) {
    return this.dataService.put(`/orders/${id}`, body);
  }
}
