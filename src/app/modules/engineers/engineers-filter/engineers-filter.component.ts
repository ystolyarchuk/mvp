import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { OrdersService } from '../../orders/orders.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-engineers-filter',
  templateUrl: './engineers-filter.component.html',
  styleUrls: ['./engineers-filter.component.scss'],
})
export class EngineersFilterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  @Input() mainSkills;
  @Input() levels;
  @Output() changed = new EventEmitter();
  @Output() reset = new EventEmitter();
  public countries: any = [];
  public filteredCountries: any;
  public cities: any = [];
  public filteredCities: any;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getCountries();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public buildForm() {
    this.form = this.fb.group({
      main_skill: '',
      self_assessment: '',
      city_id: '',
      country_code: '',
      salary_from: ['', [Validators.min(0)]],
      salary_to: ['', [Validators.min(0)]],
    });
    this.form.valueChanges.pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((res) => {
      this.changed.emit(this.form.value);
    });
  }

  public selectCountry(event) {
    this.getCities(event.option.value);
  }
  public getCities(country, city?) {
    this.sharedService.getCitiesList(country.code).subscribe((res): any => {
      this.cities = res;
      this.form.patchValue({ city_id: city || '' }, { emitEvent: false });

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
      this.form.patchValue(
        {
          city_id: res.defaults.city,
          country_code: res.defaults.country,
        },
        { emitEvent: false }
      );
      this.getCities(res.defaults.country, res.defaults.city);

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
