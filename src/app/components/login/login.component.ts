import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() {}

  startForm() {
    this.loginForm = new FormGroup({
      token: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    this.startForm();
  }

  passwordValid() {
    return this.loginForm.get('password').valid;
  }

  approveLogin() {
    return (
      this.loginForm.get('token').valid && this.loginForm.get('password').valid
    );
  }
}
