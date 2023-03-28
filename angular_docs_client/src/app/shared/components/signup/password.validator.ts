import { AbstractControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
  static match(control: AbstractControl): { [key: string]: boolean } | null {
    const parent = control.parent as FormGroup;
    if (parent) {
      const password = parent.get('password')?.value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        return { match: true };
      }
    }
    return null;
  }
}