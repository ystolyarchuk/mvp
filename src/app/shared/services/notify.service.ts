import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  public showError(err) {
    console.log(err);
    if (err.errors) {
      const keys = Object.keys(err.errors);
      if (keys.length) {
        this.snackBar.open(err.errors[keys[0]], null, { panelClass: 'error' });
      }
    }
  }
}
