import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../orders.service';
import { formatDate } from '../../../shared/utils/formatDate';
import * as moment from 'moment';
import { ScoreTypes } from '../../../shared/constants/score-types';
import { SharedService } from '../../../shared/services/shared.service';
import { onlyNumber } from '../../../shared/constants/default-errors';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public isLoading = false;
  public scoreTypes = ScoreTypes;
  public order;
  public mainSkills = [];
  public today = new Date();
  public countries: any = [];
  public filteredCountries: any;
  public cities: any = [];
  public filteredCities: any;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private ordersService: OrdersService,
    private sharedService: SharedService
  ) {}
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      programmers_needed: 1,
      main_skill: ['', [Validators.required]],
      years_of_experience: [1, [Validators.required, Validators.min(0)]],
      country_code: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      annual_salary_min: ['', [Validators.required, Validators.min(0), Validators.pattern(onlyNumber)]],
      annual_salary_max: ['', [Validators.required, Validators.min(0), Validators.pattern(onlyNumber)]],
      due_date: ['', [Validators.required]],
      min_range_test: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getMainSkills();
    if (this.router.url.indexOf('/edit') > -1) {
      this.getOrder(+this.route.snapshot.paramMap.get('id'));
      this.getCountries();
    } else {
      this.sharedService.getCountriesList().subscribe((res: any) => {
        this.countries = res.countries;
        this.form.patchValue({
          city_id: res.defaults.city,
          country_code: res.defaults.country,
          min_range_test: this.scoreTypes[0].value,
        });
        this.getCities(res.defaults.country, res.defaults.city);
        this.getCountries();
      });
    }
  }
  private getOrder(id) {
    this.isLoading = true;
    this.ordersService.getOrderById(id).subscribe(
      (res: any) => {
        this.order = res.data;
        this.form.patchValue({
          ...this.order,
          city_id: res.data.city,
          country_code: res.data.country,
          main_skill: +this.order.main_skill,
          due_date: moment(this.order.due_date * 1000).format(),
          min_range_test: this.scoreTypes.find((el) => el.value == this.order.min_range_test).value,
        });
        this.getCities(res.data.country, res.data.city);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  public getMainSkills() {
    this.sharedService.getSkillList().subscribe((res: any) => {
      this.mainSkills = res;
    });
  }

  public sendForm() {
    const body = {
      ...this.form.value,
      due_date: formatDate(this.form.value.due_date),
      city_id: this.form.value.city_id.id,
      country_code: this.form.value.country_code.code,
    };
    console.log(body);
    if (!this.order) {
      this.isLoading = true;
      this.ordersService.createOrder(body).subscribe((res) => {
        console.log(res);
        this.snackBar.open('Order was created');
        this.router.navigate(['/orders']);
        this.isLoading = false;
      });
    } else {
      this.isLoading = true;
      this.ordersService.updateOrder(this.order.id, body).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.open('Order was updated');
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
    }
  }

  public counter(name, plus?) {
    const value = parseInt(this.form.get(name).value, 10) + (plus ? 1 : -1);
    this.form.patchValue({
      [name]: value < 1 ? 1 : value,
    });
  }

  public selectCountry(event) {
    this.getCities(event.option.value);
  }

  public getCities(country, city?) {
    this.sharedService.getCitiesList(country.code).subscribe((res): any => {
      this.cities = res;
      this.form.patchValue({ city_id: city || '' });

      this.filteredCities = this.form.get('city_id').valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this.filterCity(name) : this.cities.slice())),
        takeUntil(this.destroy$)
      );
    });
  }
  public getCountries() {
    this.sharedService.getCountriesList().subscribe((res: any) => {
      this.countries = res.countries;
      this.filteredCountries = this.form.get('country_code').valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this.filterCountry(name) : this.countries.slice())),
        takeUntil(this.destroy$)
      );
    });
  }

  private filterCountry(value: string) {
    const filterValue = value.toLowerCase();

    return this.countries.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterCity(value: string) {
    const filterValue = value.toLowerCase();

    return this.cities.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public displayFnCountry(item) {
    return item && item.name ? item.name : '';
  }
  public displayFnCity(item) {
    return item && item.name ? item.name : '';
  }
}
