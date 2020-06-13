import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_core/auth/_service/auth.service';
import { NotificationService } from '../_service/notification.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
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

  signIn() {
    this.isLoading = true;
    if(!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.login(email, password)
      .pipe(tap(()=>this.isLoading = false))
      .subscribe(response => {
        this.router.navigate(['/home']);
    });
  }

  signUp() {
    this.isLoading = true;
    if(!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.signUp(email, password)
      .pipe(tap(()=>this.isLoading = false))
      .subscribe(response => {
        this.router.navigate(['/home']);
    });
  }
}
