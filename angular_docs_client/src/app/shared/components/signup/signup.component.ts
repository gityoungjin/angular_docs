import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { PasswordValidator } from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userForm!: FormGroup;
  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{4,15}')
      ]),
      // passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('',[Validators.required, PasswordValidator.match]),
      // }, [this.passwordValidator.validate]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required,
      ]),
    });
  }

}
