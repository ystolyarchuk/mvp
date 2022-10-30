import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderViewComponent } from './order-view/order-view.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: ListOrdersComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: OrderFormComponent,
      },
      {
        path: ':id',
        component: OrderViewComponent,
      },
      {
        path: ':id/edit',
        component: OrderFormComponent,
        pathMatch: 'full',
      },
    ]
  },
  // { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
