import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../shared/validators/must-match.validator';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../../shared/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public form: FormGroup;
  public mainSkills: any = [];
  public levels: any = [];
  public user;
  public isLoading = false;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.form = this.fb.group(
      {
        photo: '',
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        location: ['', [Validators.required]],
        experience_years: [0, [Validators.required]],
        phone_number: ['', [Validators.required]],
        main_skill: ['', [Validators.required]],
        self_assessment: ['', [Validators.required]],
        expected_salary: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
      },
      { validators: MustMatch('password', 'password_confirmation') }
    );
    this.isLoading = true;
    forkJoin({
      levels: this.sharedService.getLevels(),
      skills: this.sharedService.getSkillList(),
      user: this.authService.getMe(),
    }).subscribe(({ levels, skills, user }) => {
      this.levels = levels;
      this.mainSkills = skills;
      this.user = user;
      this.form.patchValue(this.user);
      this.isLoading = false;
    });
  }

  public counter(name, plus?) {
    const value = parseInt(this.form.get(name).value, 10) + (plus ? 1 : -1);
    this.form.patchValue({
      [name]: value < 1 ? 1 : value,
    });
  }
}
