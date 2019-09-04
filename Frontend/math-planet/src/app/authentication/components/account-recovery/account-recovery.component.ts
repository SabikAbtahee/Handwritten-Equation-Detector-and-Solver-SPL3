import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserInformation } from '../../../config/interfaces/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { urlPaths, recoverAccountCode, defaultConst } from '../../../config/constants/defaultConstants';
import { SharedService } from '../../../shared/services/shared.service';
import { ValidationErrorMessages } from '../../../config/validators/errormessages.validator';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import * as _ from 'lodash';

@Component({
	selector: 'app-account-recovery',
	templateUrl: './account-recovery.component.html',
	styleUrls: [ './account-recovery.component.scss' ]
})
export class AccountRecoveryComponent implements OnInit {
	user: UserInformation;
	recoveryForm: FormGroup;
	isLoading: boolean = false;
	constructor(
		private authenticationservice: AuthenticationService,
		private fb: FormBuilder,
		private router: Router,
		private sharedService: SharedService,
		private errorMessages: ValidationErrorMessages,
		private util: UtilityService
	) {}

	ngOnInit() {
		this.makeRecoveryForm();
	}

	makeRecoveryForm() {
		this.recoveryForm = this.fb.group({
			email: [ '' ]
		});
	}

	sendPasswordResetEmail(user: UserInformation) {
		this.authenticationservice.sendPasswordResetEmail(user).pipe(first()).subscribe((res) => {
			// console.log(res);
			if (res && res.code) {
				this.validateForm(res.code);
			} else {
				this.openSnackBar();
			}
			this.isLoading = false;
		});
	}

	validateForm(errorCode) {
		this.updateform();
		let errobj = {};
		errobj[errorCode] = true;
		this.recoveryForm.controls.email.setErrors(errobj);
	}
	emailError() {
		// return 'asdf';
		return this.errorMessages.resetPasswordMessage(this.recoveryForm.get('email'));
	}
	updateform() {
		let controlsvalues = this.util.getFormControlsValueFromFormGroup(this.recoveryForm);
		_.forEach(controlsvalues, (value) => {
			this.recoveryForm.get(value).markAsTouched();
		});
	}

	openSnackBar() {
		this.sharedService.openSnackBar({
			data: { message: defaultConst.emailsent, isAccepted: true },
			duration: 2,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}

	onSubmit() {
		if (this.recoveryForm.valid) {
			this.isLoading = true;
			this.user = {
				email: this.recoveryForm.value.email,
				password: ''
			};
			this.sendPasswordResetEmail(this.user);
		}
	}
	routeToSignin() {
		this.router.navigate([ urlPaths.Authentication.Signin.url ]);
	}
}
