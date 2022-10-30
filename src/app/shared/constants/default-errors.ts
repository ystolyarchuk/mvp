import { InjectionToken } from '@angular/core';

export const phoneNumber = /^\+?\d+?$/;
export const onlyNumber = /^\d+?$/;
export const patternNumber = /^\d+(\.\d{1,3})?$/;
export const pattern2Number = /^\d+(\.\d{1,2})?$/;
export const defaultErrors = {
  required: (): string => `Field is required`,
  email: (): string => `The email must be a valid email address.`,
  notCreate: (): string => `Please select item from the list.`,
  mustMatch: (): string => `Confirm password must match password!`,
  checkboxValidator: (): string => `At least one field is required`,
  minlength: ({ requiredLength }): string => `Field must have ${requiredLength} or more characters`,
  maxlength: ({ requiredLength }): string => `Field must have ${requiredLength} or less characters`,
  min: ({ min }): string => `Field should be from ${min}`,
  max: ({ max }): string => `Field should be to ${max}`,
  pattern: (): string => `Field should has correct value`,
  matDatepickerParse: (): string => `Field should has correct value`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => {
    return {
      ...defaultErrors,
    };
  },
});
