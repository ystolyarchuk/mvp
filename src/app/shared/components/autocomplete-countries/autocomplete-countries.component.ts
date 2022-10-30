import { Component, EventEmitter, ExistingProvider, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SharedService } from '../../services/shared.service';

export const AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoCompleteCountriesComponent),
  multi: true,
};

@Component({
  selector: 'app-autocomplete-countries',
  templateUrl: './autocomplete-countries.component.html',
  styleUrls: ['./autocomplete-countries.component.scss'],
  providers: [AUTOCOMPLETE_VALUE_ACCESSOR],
})
export class AutoCompleteCountriesComponent implements OnInit, ControlValueAccessor, OnDestroy {
  public itemCtrl = new FormControl('');
  public filteredItems = [];
  public onChange;
  public isLoading = false;
  public query = '';
  public meta;
  @Input() placeholder;
  @Input() arrow;
  @Input() create;
  @Input() required;
  @Input() disable;
  @Output() public changed = new EventEmitter<any>();
  @ViewChild('itemsAutocomplete') itemsAutocompleteRef: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  constructor(private sharedService: SharedService) {}

  public destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit() {
    if (this.required) {
      this.itemCtrl.setValidators([Validators.required, Validators.minLength(2)]);
    }
    if (this.disable) {
      this.itemCtrl.disable();
    }
    this.itemCtrl.valueChanges
      .pipe(
        debounceTime(800),
        map((el) => (typeof el === 'string' ? el : el.name)),
        filter((el) => el.trim()),
        switchMap((value) => {
          this.filteredItems = [];
          return this.sharedService.getCountriesList(value).pipe(
            map((res) => {
              this.query = value;
              return res;
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res: any) => {
        this.meta = res.defaults;
        this.filteredItems = [{ id: 'any', name: 'Any' }, ...res.countries];
      });
  }

  public autoCompleteScroll() {
    setTimeout(() => {
      if (this.itemsAutocompleteRef && this.autocompleteTrigger && this.itemsAutocompleteRef.panel) {
        fromEvent(this.itemsAutocompleteRef.panel.nativeElement, 'scroll')
          .pipe(
            map(() => this.itemsAutocompleteRef.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe((x) => {});
      }
    });
  }

  public change(value) {
    this.onChange(value);
  }

  public inputChange(event) {
    this.changed.emit(event.option.value);
    this.change(event.option.value);
  }

  public registerOnTouched(fn: () => void) {}

  public writeValue(value) {
    if (value) {
      this.itemCtrl.setValue(value);
    }
  }

  public registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  public displayFn(item?): string | undefined {
    return item ? item.name : '';
  }
}
