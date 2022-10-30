import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreTypes } from '../../../../shared/constants/score-types';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  @Output() onDeleteOrder = new EventEmitter();
  public orderScore;
  public scoreTypes = ScoreTypes;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.orderScore = this.scoreTypes.find((el) => el.value == this.order.min_range_test).name;
  }

  public deleteOrder() {
    this.onDeleteOrder.emit(this.order);
  }
  public viewOrder() {
    this.router.navigate([`/orders/${this.order.id}`]);
  }
  public editOrder() {
    this.router.navigate([`/orders/${this.order.id}/edit`]);
  }
  public clickMenu(event) {
    event.stopPropagation();
  }
}
