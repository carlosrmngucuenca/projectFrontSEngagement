import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static atLeastOneCheckedValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const atLeastOneChecked = Object.values(group.value).some(
        (value: unknown) => {
          if (typeof value === 'boolean') {
            return value;
          }
          return false;
        }
      );

      return atLeastOneChecked ? null : { required: true };
    };
  }

  static atLeastOneCheckedValidatorSingleOption() {
    return (group: AbstractControl) => {
      const atLeastOneChecked = Object.values(group.value).some(
        (value: unknown) => {
          if (typeof value === 'string') {
            return value;
          }
          return false;
        }
      );

      return atLeastOneChecked ? null : { required: true };
    };
  }
}
