import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { FormSubmitHandlerDirective } from './form-submit-handler.directive';
import { FORM_ERRORS } from '../constants/default-errors';

@Directive({
  selector: '[formControlName], [formControl]'
})
export class FormControlNameDirective implements OnInit, OnDestroy {
  public oldValue;
  private submit$: Observable<any>;
  private componentRef: ComponentRef<ControlErrorComponent>;
  @Input() formControlName;
  @Input() defaultErrors;

  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(FORM_ERRORS) private errors,
    @Self() private control: NgControl,
    @Optional()
    @Host()
    private form: FormSubmitHandlerDirective,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.submit$ = form ? form.submit$ : EMPTY;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  public checkErrors() {
    if (this.defaultErrors === undefined) {
      const firstKey = this.control.errors ? Object.keys(this.control.errors)[0] : '';
      if (firstKey) {
        const value = this.control.errors[firstKey];
        setTimeout(() => {
          if (this.control.control.touched && this.control.invalid && this.errors[firstKey]) {
            this.setErrors(this.errors[firstKey](value || value === 0 ? value : firstKey));
          } else {
            this.setErrors('');
          }
        });
      } else {
        this.setErrors('');
      }
    }
  }

  ngOnInit() {
    this.oldValue = this.control.value;
    if (this.oldValue) {
      this.checkErrors();
    }
    merge(this.control.valueChanges)
      .pipe(
        tap(() => this.checkErrors()),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        if (this.oldValue === res) {
          this.control.control.markAsPristine();
        }
      });
    merge(this.submit$)
      .pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.oldValue = this.control.value;
      });
  }

  private setErrors(message: string): void {
    if (!this.componentRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ControlErrorComponent);
      this.componentRef = this.viewContainerRef.createComponent(factory);
    }
    this.componentRef.instance.errorMessage = message;
  }
}
