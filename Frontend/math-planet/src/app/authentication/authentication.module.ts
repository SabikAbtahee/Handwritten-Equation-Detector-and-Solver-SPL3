import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AccountRecoveryComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
