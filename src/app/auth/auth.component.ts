import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './_service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
    ) { }
  
  authForm: FormGroup;
  isLoading = false;
  error: string = null;
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.isLoading = true;
    if(!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.login(email, password).subscribe(response => {
      console.log(response)
      this.isLoading = false;
    },
    errorMessage => {
      this.isLoading = false;
    });
  }

}
