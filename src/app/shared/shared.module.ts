import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControlNameDirective } from './directives/form-control-name.directive';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { FormSubmitHandlerDirective } from './directives/form-submit-handler.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { PasswordStrengthCheckerComponent } from './components/password-strength-checker/password-strength-checker.component';
import { BtnBackDirective } from './directives/btn-back.directive';
import { MatInputModule } from '@angular/material/input';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { AutoCompleteCountriesComponent } from './components/autocomplete-countries/autocomplete-countries.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCitiesComponent } from './components/autocomplete-cities/autocomplete-cities.component';
import { ConfirmationDialogComponent } from './components/modals/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    BtnBackDirective,
    SpinnerComponent,
    FormControlNameDirective,
    ControlErrorComponent,
    PasswordStrengthCheckerComponent,
    FormSubmitHandlerDirective,
    FormatDatePipe,
    UserNavComponent,
    AutoCompleteCountriesComponent,
    AutoCompleteCitiesComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
  exports: [
    SpinnerComponent,
    BtnBackDirective,
    MatProgressSpinnerModule,
    FormControlNameDirective,
    ControlErrorComponent,
    FormSubmitHandlerDirective,
    FormatDatePipe,
    PasswordStrengthCheckerComponent,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    UserNavComponent,
    AutoCompleteCountriesComponent,
    AutoCompleteCitiesComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}
