import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderItemComponent } from './list-orders/order-item/order-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../shared/shared.module';
import { OrderEngineerComponent } from './order-engineer/order-engineer.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [OrdersComponent, ListOrdersComponent, OrderItemComponent, OrderFormComponent, OrderViewComponent, OrderEngineerComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    SharedModule,
    MatAutocompleteModule,
  ],
})
export class OrdersModule {}
