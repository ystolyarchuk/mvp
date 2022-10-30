import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-strength-checker',
  templateUrl: './password-strength-checker.component.html',
  styleUrls: ['./password-strength-checker.component.scss'],
})
export class PasswordStrengthCheckerComponent implements OnInit, OnChanges {
  @Input() value;
  public countItems = 5;
  public counts;
  public strength;
  public activeItems;

  constructor() {}

  ngOnInit() {
    this.counts = new Array(this.countItems).fill('1', 0, this.countItems);
  }

  public checkStrength(pass: string) {
    return [/[a-z]+/.test(pass), /[A-Z]+/.test(pass), /[0-9]+/.test(pass)].filter((item: boolean) => {
      return item === true;
    }).length;
  }

  ngOnChanges(changes) {
    const val = changes.value.currentValue;
    if (!changes.value.firstChange) {
      const strength = this.checkStrength(val);
      switch (strength) {
        case 1:
          this.strength = 'low';
          this.activeItems = 1;
          break;
        case 2:
          this.strength = 'medium';
          this.activeItems = Math.round(this.countItems * 0.6);
          break;
        case 3:
          this.strength = 'strong';
          this.activeItems = this.countItems;
          break;
      }
    }
  }
}
