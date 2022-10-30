import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MustMatch } from '../../shared/validators/must-match.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../shared/services/shared.service';
import { forkJoin } from 'rxjs';
import { phoneNumber } from '../../shared/constants/default-errors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./../scss/auth.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  public mainSkills: any = [];
  public levels: any = [];
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        phone_number: ['', [Validators.required, Validators.minLength(10), Validators.pattern(phoneNumber)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
      },
      { validators: MustMatch('password', 'password_confirmation') }
    );

    this.isLoading = true;
    forkJoin({
      levels: this.sharedService.getLevels(),
      skills: this.sharedService.getSkillList(),
    }).subscribe(({ levels, skills }) => {
      this.levels = levels;
      this.mainSkills = skills;
      this.isLoading = false;
    });
  }

  public sendForm() {
    this.isLoading = true;
    this.authService.reg(this.form.value).subscribe(
      (res: any) => {
        this.authService.setAccessToken(res);
        this.snackBar.open('Registration was successful');
        this.route.navigate(['']);
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
