import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineersComponent } from './engineers.component';
import { EngineersRoutingModule } from './engineers-routing.module';
import { EngineersListComponent } from './engineers-list/engineers-list.component';
import { EngineerItemComponent } from './engineer-item/engineer-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EngineersFilterComponent } from './engineers-filter/engineers-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { EngineersListOrdersComponent } from './engineers-list-orders/engineers-list-orders.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [EngineersComponent, EngineersListOrdersComponent, EngineersListComponent, EngineerItemComponent, EngineersFilterComponent],
  imports: [
    CommonModule,
    EngineersRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
})
export class EngineersModule {}
