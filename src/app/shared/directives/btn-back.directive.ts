import { Directive, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Directive({
  selector: '[appBtnBack]',
})
export class BtnBackDirective {
  @Input('url') url;
  constructor(private location: Location, private router: Router) {}

  @HostListener('click')
  onClick() {
    if (this.url) {
      this.router.navigate([`${this.url}`]);
    } else {
      this.location.back();
    }
  }
}
