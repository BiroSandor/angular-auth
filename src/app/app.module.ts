import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService, ConfigModule } from './_service/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './_shared/loading-spinner/loading-spinner.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotificationComponent } from './_shared/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    SignInComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [
    ConfigService,
    ConfigModule.init(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
