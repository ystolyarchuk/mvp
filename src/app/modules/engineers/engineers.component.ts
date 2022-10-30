import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EngineersService } from './engineers.service';
import { SharedService } from '../../shared/services/shared.service';
import { OrdersService } from '../orders/orders.service';
import { EngineersListOrdersComponent } from './engineers-list-orders/engineers-list-orders.component';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.scss'],
})
export class EngineersComponent implements OnInit {
  public engineers = [];
  public mainSkills = [];
  public levels = [];
  public orders = [];
  public isLoading = false;
  public isSmLoading = false;
  public filterDefault: any = {
    order_id: '',
    self_assessment: '',
    main_skill: '',
    experience_years: '',
    location: '',
    salary_from: '',
    salary_to: '',
    city: '',
  };
  public allOrders = {
    id: 'all',
    name: 'All orders',
  };

  public filter = this.filterDefault;

  @ViewChild('ordersRef') ordersRef: EngineersListOrdersComponent;

  constructor(private engineersService: EngineersService, private sharedService: SharedService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin({
      skills: this.sharedService.getSkillList(),
      levels: this.sharedService.getLevels(),
      orders: this.ordersService.getOrders(),
    }).subscribe(
      ({ skills, levels, orders }: any) => {
        this.mainSkills = skills;
        this.levels = levels;
        this.orders = [this.allOrders, ...orders.data];
        this.getEngineers();
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  public changeFilter(filter) {
    console.log({ ...filter });
    this.filter = { ...filter };
    console.log(this.filter);
    this.getEngineers(this.filter);
  }
  public changeOrders(id) {
    console.log(id);
    this.filter.order_id = id !== 'all' ? id : '';
    this.getEngineers(this.filter);
  }

  public getEngineers(filter?) {
    const url = filter ? this.mapFilter(filter) : '';
    this.isSmLoading = true;
    this.engineersService.getOrdersEngineers(url).subscribe(
      (res: any) => {
        this.engineers = [...res.data];
        this.isSmLoading = false;
      },
      () => (this.isSmLoading = false)
    );
  }
  public mapFilter(filter) {
    let url = '';
    if (filter.order_id && filter.order_id !== 'all') {
      url += `order_id=${filter.order_id}&`;
    }
    if (filter.main_skill) {
      filter.main_skill.forEach((el, i) => {
        url += `main_skill[${i}]=${el.id}&`;
      });
    }
    if (filter.self_assessment) {
      filter.self_assessment.forEach((el, i) => {
        url += `self_assessment[${i}]=${el.id}&`;
      });
    }
    url += `country_code=${filter.country_code?.code || ''}&`;
    url += `city_id=${filter.city_id?.id || ''}&`;
    url += `salary_from=${filter.salary_from || ''}&`;
    url += `salary_to=${filter.salary_to || ''}&`;
    return url;
  }

  public resetFilter() {
    this.ordersRef.reset();
    this.getEngineers();
  }
}
