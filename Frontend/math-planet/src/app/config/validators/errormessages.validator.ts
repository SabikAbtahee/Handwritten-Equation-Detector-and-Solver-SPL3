import { FormControl } from '@angular/forms';
import { signinErrorCode, recoverAccountCode, signupErrorCodes } from '../constants/defaultConstants';

export class ValidationErrorMessages {

	// Sign in page
	emailMessage(control) {
		return control.hasError('required')
			? 'You must enter an Email address'
			: control.hasError('email') ? 'Invalid email address' : null;
	}

	authMessageForEmail(control) {
		return control.hasError('required')
			? 'You must enter an Email address'
			: control.hasError('email')
				? 'Invalid email address'
				: control.hasError(signinErrorCode['User not found'].code)
					? signinErrorCode['User not found'].message
					: control.hasError(signinErrorCode['Invalid Email'].code)
						? signinErrorCode['Invalid Email'].message
						: control.hasError(signinErrorCode['User Disabled'].code)
							? signinErrorCode['User Disabled'].message
							: null;
	}
	authMessageForPassword(control) {
		return control.hasError('required')
			? 'Enter password'
			: control.hasError(signinErrorCode['Wrong password'].code)
				? signinErrorCode['Wrong password'].message
				: null;
	}

	// Account recovery
	resetPasswordMessage(control) {
		return control.hasError(recoverAccountCode['Invalid Email'].code)
			? recoverAccountCode['Invalid Email'].message
			: control.hasError(recoverAccountCode['User not found'].code)
				? recoverAccountCode['User not found'].message
				: null;
	}

	// Sign up page
	authMessageForSignUpEmail(control) {
		return control.hasError(signupErrorCodes['Email Already in use'].code)
			? signupErrorCodes['Email Already in use'].message
			: control.hasError(signupErrorCodes['Invalid Email'].code)
				? signupErrorCodes['Invalid Email'].message
				: control.hasError(signupErrorCodes['Invalid Operation'].code)
					? signupErrorCodes['Invalid Operation'].message
					: null;
	}
	authMessageForSignupPassword(control) {
		return control.hasError(signupErrorCodes['Weak Password'].code)
			? signupErrorCodes['Weak Password'].message
			: null;
	}
}
