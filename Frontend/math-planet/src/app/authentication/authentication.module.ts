import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
// import { SignOutComponent } from './components/sign-out/sign-out.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes:Routes=[
  {
    path:'sign-in',
    component:SignInComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'account-recovery',
    component:AccountRecoveryComponent
  },
]


@NgModule({
  declarations: [SignInComponent, SignUpComponent, AccountRecoveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthenticationModule { }
