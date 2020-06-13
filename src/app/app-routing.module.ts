import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_core/auth/_service/auth-guard';
import { CharacterComponent } from './character/character.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'signIn', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'character/:id', component: CharacterComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
