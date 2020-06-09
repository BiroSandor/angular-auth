import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../_service/config.service';
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

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.login(email, password).subscribe(response => {
      console.log(response)
    });
  }

}
