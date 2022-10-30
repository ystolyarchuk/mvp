import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { EngineersService } from '../../engineers/engineers.service';
import { forkJoin } from 'rxjs';
import { ScoreTypes } from '../../../shared/constants/score-types';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {
  public isLoading = false;
  public order;
  public orderScore;
  public scoreTypes = ScoreTypes;
  public engineers: any = [];

  constructor(private ordersService: OrdersService, private engineersService: EngineersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    forkJoin({
      order: this.ordersService.getOrderById(id),
      engineers: this.engineersService.getOrdersEngineers(`order_id=${id}`),
    }).subscribe(
      ({ order, engineers }: any) => {
        this.order = order.data;
        this.orderScore = this.scoreTypes.find((el) => el.value == this.order.min_range_test).name;
        this.engineers = engineers.data;
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }
}
