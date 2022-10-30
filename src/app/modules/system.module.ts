import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { AsideComponent } from './layouts/aside/aside.component';
import { MenuComponent } from './layouts/aside/menu/menu.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SystemComponent, AsideComponent, MenuComponent, HeaderComponent],
  imports: [CommonModule, SystemRoutingModule, SharedModule],
})
export class SystemModule {}
