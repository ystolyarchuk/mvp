import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../scss/auth.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;

  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public sendForm() {
    this.isLoading = true;
    this.authService.login(this.form.value).subscribe(
      (res: any) => {
        this.authService.setAccessToken(res);
        this.route.navigate(['']);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}
