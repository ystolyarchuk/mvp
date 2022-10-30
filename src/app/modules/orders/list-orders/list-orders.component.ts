import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrdersService } from '../orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit, OnDestroy {
  public orders = [];
  public meta;
  public isLoading = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private ordersService: OrdersService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ordersService.getOrders().subscribe(
      (res: any) => {
        console.log(res);
        this.orders = [...res.data];
        this.meta = res.meta;
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public deleteOrder(order){
    this.ordersService.deleteOrder(order.id).subscribe((res) => {
      console.log(res);
      this.orders = this.orders.filter(el => el.id !== order.id);
      this.snackBar.open('Order was deleted');
    });
  }
}
