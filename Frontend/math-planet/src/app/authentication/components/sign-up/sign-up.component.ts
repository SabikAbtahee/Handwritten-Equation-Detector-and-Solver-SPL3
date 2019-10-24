import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserInformation, CustomerUserInformation } from '../../../config/interfaces/user.interface';
import { first, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defaultConst, urlPaths, passwordRegex, signupErrorCodes, error_messages } from '../../../config/constants/defaultConstants';
import { SharedService } from '../../../shared/services/shared.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { ErrorStateMatcherForsignUppage } from '../../../core/utility-service/utility.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.scss' ]
})
export class SignUpComponent implements OnInit, OnDestroy {
	signupform: FormGroup;
	userInformation: UserInformation;
	errormessages = error_messages;
	_unsubscribeAll: Subject<any>;
	verificationEmailsent = defaultConst.checkEmail;
	matcher;
	isLoading: boolean = false;
	constructor(
		private authenticationService: AuthenticationService,
		private fb: FormBuilder,
		private router: Router,
		private sharedService: SharedService
	) {
		this._unsubscribeAll = new Subject();
	}

	ngOnInit() {
		this.makeSignUpForm();
		this.setCustomValidation();
	}

	makeSignUpForm() {
		this.signupform = this.fb.group({
			name: [ '', Validators.required ],
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			confirmpassword: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
		});
	}

	passwordMatchValidator(group: FormGroup): any {
		if (group) {
			if (group.get('password').value !== group.get('confirmpassword').value) {
				return { notMatching: true };
			}
		}

		return null;
	}

	setCustomValidation() {
		this.signupform.setValidators(this.passwordMatchValidator);
		this.signupform.updateValueAndValidity();
		this.matcher = new ErrorStateMatcherForsignUppage();
	}

	onSubmit() {
		if(this.signupform.valid){
			this.isLoading = true;
			this.userInformation = {
				email: this.signupform.value.email,
				password: this.signupform.value.password,
				displayName: this.signupform.value.name,
				metaData: {
					name: this.signupform.value.name,
					email: this.signupform.value.email,
				}
			};
			this.registerUser(this.userInformation);
		}
		else{
			this.authenticationService.touchAllfields(this.signupform);
		}
		
	}

	registerUser(user: UserInformation) {
		this.authenticationService.signUp(user).pipe(first()).subscribe((res) => {
			if (res && res.code) {
				_.forEach(signupErrorCodes, (value, key) => {
					if (res.code == value.code) {
						this.openErrorBar(value.message);
					}
				});
			} else {
				this.openVerificationBar();
				this.routeToHome();
			}
			this.isLoading = false;
		});
	}

	openVerificationBar() {
		this.sharedService.openSnackBar({
			data: { message: this.verificationEmailsent, isAccepted: true },
			duration: 6,
			panelClass: [ 'default-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
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

	routeToSignin() {
		this.router.navigate([ urlPaths.Authentication.Signin.url ]);
	}

	routeToHome() {
		this.router.navigate([ urlPaths.Authentication.Signin.url ]);
	}
	ngOnDestroy() {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
		this._unsubscribeAll.unsubscribe();
	}
}
