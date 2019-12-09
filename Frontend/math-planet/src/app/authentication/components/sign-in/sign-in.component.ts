import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserInformation } from '../../../config/interfaces/user.interface';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { urlPaths, signinErrorCode } from '../../../config/constants/defaultConstants';
import { UtilityService } from '../../../core/utility-service/utility.service';
import * as _ from 'lodash';
import { NavbarComponent } from '../../../root/navbar/navbar.component';
import { RootService } from '../../../root/services/root.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ]
})
export class SignInComponent implements OnInit {
	constructor(
		private authenticationservice: AuthenticationService,
		private fb: FormBuilder,
		private router: Router,
		private util: UtilityService,
		private root:RootService,
		private sharedService:SharedService
	) {}

	signinform: FormGroup;
	userInformation: UserInformation;
	isLoading: boolean = false;
	ngOnInit() {
		this.makeSignInForm();
	}

	makeSignInForm() {
		this.signinform = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', Validators.required ]
		});
	}

	onSubmit() {
		if(this.signinform.valid){
			this.isLoading = true;
			this.userInformation = {
				email: this.signinform.value.email,
				password: this.signinform.value.password
			};
			// setTimeout(()=>{
			// 	this.signinUser(this.userInformation);
			// }, 4000);
			this.signinUser(this.userInformation);
		}
		
	}

	signinUser(user: UserInformation) {
		this.authenticationservice.signin(user).pipe(first()).subscribe((res) => {
			if (res && res.code) {
				// console.log(res.code);
				this.validateSignIn(res.code);
				this.isLoading = false;
			} else {
				this.router.navigate([ urlPaths.MathSolver.upload.url ]);
				this.isLoading = false;

				// console.log(this.authenticationservice.getCurrentUser().email);
				// location.reload();

			}
		},err=>{
			this.openErrorBar('Try Again');
		});
	}

	routeToSignup() {
		this.router.navigate([ urlPaths.Authentication.Signup.url ]);
	}
	routeToAccountRecovery() {
		this.router.navigate([ urlPaths.Authentication.AccountRecovery.url ]);
	}
	routeToHome(){
		this.router.navigate([ urlPaths.MathSolver.upload.url ]);
	}

	validateSignIn(errorCode) {
		this.updateform();
		
		let errobj={};
		errobj[errorCode]=true;
		if(errorCode==signinErrorCode["Wrong password"].code){
			this.signinform.controls.password.setErrors(errobj);
		}
		else{
			this.signinform.controls.email.setErrors(errobj);
		}
		this.openErrorBar(String(errorCode));
	}

	updateform() {
		let controlsvalues = this.util.getFormControlsValueFromFormGroup(this.signinform);
		_.forEach(controlsvalues, (value) => {
			this.signinform.get(value).markAsTouched();
		});
	}
	openErrorBar(errorMessage) {
		this.sharedService.openSnackBar({
			data: { message: errorMessage, isAccepted: false },
			duration: 2,
			panelClass: [ 'default-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}

	
}
