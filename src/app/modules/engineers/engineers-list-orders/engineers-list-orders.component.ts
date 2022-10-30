import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-engineers-list-orders',
  templateUrl: './engineers-list-orders.component.html',
  styleUrls: ['./engineers-list-orders.component.scss'],
})
export class EngineersListOrdersComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  @Input() orders;
  @Output() changed = new EventEmitter();
  @ViewChildren('orderRef') orderRef: QueryList<any>;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.orderRef.forEach((el, i) => {
        el.nativeElement.checked = i === 0;
      });
    }, 0);
  }

  public buildForm() {
    this.form = this.fb.group({
      order: '',
    });
    this.form.valueChanges.subscribe((res) => {
      this.changed.emit(res.order);
    });
  }

  public reset() {
    console.log('reset');
  }
}
