import { Directive, ElementRef, Input,  } from '@angular/core';

import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
  selector: 'form'
})
export class FormSubmitHandlerDirective {
  @Input() formGroup;
  submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  constructor(private host: ElementRef<HTMLFormElement>) {
  }

  get element(): HTMLElement {
    return this.host.nativeElement;
  }
}
