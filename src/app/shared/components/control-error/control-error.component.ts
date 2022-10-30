import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  @Input()
  set errorMessage(message: string) {
    if (message !== this.errors.message) {
      this.errors = {
        message
      };
      this.hide = !message;

      this.cdr.markForCheck();
    }
  }

  errors: {
    message: string;
  };

  hide = true;

  constructor(private cdr: ChangeDetectorRef) {
    this.errors = {
      message: ''
    };
  }
}
