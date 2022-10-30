import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineersComponent } from './engineers.component';
const routes: Routes = [
  {
    path: '',
    component: EngineersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineersRoutingModule {}
