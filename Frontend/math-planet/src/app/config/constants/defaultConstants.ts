import { baseURL } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
export const defaultConst = {
	
	sidebar: [
		{
			name: 'Home',
			url: 'authentication/sign-in',
			icon:'home',
			mini_name:'Home'
		},
		{
			name: 'Upload Image',
			url: 'mathsolver/upload',
			icon:'cloud_upload',
			mini_name:'Upload'
		},
		{
			name: 'Draw Image',
			url: 'mathsolver/draw',
			icon:'color_lens',
			mini_name:'Draw'
		},
		
		{
			name: 'Practice',
			url: 'mathpractice',
			icon:'ballot',
			mini_name:'Practice'
		},
		{
			name: 'Tutorial',
			url: 'tutorial',
			icon:'help_outline',
			mini_name:'Tutorial'

		},
		
	],
	sidebarLoggedIn:[
		
		{
			name: 'Upload Image',
			url: 'mathsolver/upload',
			icon:'cloud_upload',
			mini_name:'Upload'

		},
		{
			name: 'Draw Image',
			url: 'mathsolver/draw',
			icon:'color_lens',
			mini_name:'Draw'

		},
		{
			name: 'Show History',
			url: 'history',
			icon:'hourglass_empty',
			mini_name:'History'

		},
		{
			name: 'Practice',
			url: 'mathpractice',
			icon:'ballot',
			mini_name:'Practice'

		},
		{
			name: 'Tutorial',
			url: 'tutorial',
			icon:'help_outline',
			mini_name:'Tutorial'

		},
	],
	menu: {
		
		logout: {
			name: 'Logout',
			url: 'authentication/sign-in'
		}
	},
	siteName: {
		name: 'Math Planet',
		url: 'https://oshop-e9657.firebaseapp.com/'
	},
	
	emailsent:'Email sent successfully',
	checkEmail:'Verification email sent',
	annonymous:'Annonymous'
};

export const signinErrorCode = {
	'Invalid Email': {
		code: 'auth/invalid-email',
		message: 'Enter valid email address'
	},
	'User Disabled': {
		code: 'auth/user-disabled',
		message: 'Account with the corresponding email is disabled'
	},
	'User not found': {
		code: 'auth/user-not-found',
		message: 'No such user found with the corresponding email'
	},
	'Wrong password': {
		code: 'auth/wrong-password',
		message: 'Password does not match'
	}
}

export const recoverAccountCode ={
	'Invalid Email':{
		code:'auth/invalid-email',
		message: 'Enter valid email address'
	},
	'User not found':{
		code:'auth/user-not-found',
		message: 'No such email is registered'
	}
}

export const signupErrorCodes = {
	'Email Already in use':{
		code:'auth/email-already-in-use',
		message:'This email is taken'
	},
	'Invalid Email':{
		code:'auth/invalid-email',
		message: 'Enter valid email address'
	},
	'Invalid Operation':{
		code:'auth/operation-not-allowed',
		message: 'Site do not have permission'
	},
	'Weak Password':{
		code:'auth/weak-password',
		message:'Password is too weak'
	}

}

// export const passwordRegex='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm';
export const passwordRegex='^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

// This can vary if routes are changed in module so maintain consistency
export const urlPaths = {
	Authentication: {
		Signin: {
			url: 'authentication/sign-in'
		},
		Signup: {
			url: 'authentication/sign-up'
		},
		AccountRecovery: {
			url: 'authentication/account-recovery'
		}
	},
	MathSolver:{
		upload:{
			url:'mathsolver/upload'
		},
		draw:{
			url:'mathsolver/draw'
		}
	},
	MathPractice:{
		practice:{
			url:'mathpractice'
		}
	},
	MathTutorial:{
		tutorial:{
			url:'tutorial'
		}
	},
	MathHistory:{
		history:{
			url:'history'
		}
	}
};


export const apiRoutes={
	baseURL:`${baseURL}`,
	predict:`${baseURL}/predict`
}

export const httpHeader = {
	headers: new HttpHeaders({
		'Content-Type': 'text/html',
		
	})
};


export const error_messages={
	updated:'Updated',
	failed:'Failed'

}