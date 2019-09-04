
export interface UserInformation {
	password: string;
	email: string;
	displayName?:string;
	metaData?:CustomerUserInformation;

}

export interface CustomerUserInformation {
	uid?:string;
	name?:string;
	email: string;
	photoURL?:string;
}

export interface firebaseUserInformation {
	displayName?:string;
	email?:string;
	emailVerified?:string;
	isAnonymous?:string;
	metadata?:string;
	phoneNumber?:string;
	photoURL?:string;
	providerData?:string;
	providerId?:string;
	refreshToken?:string;
	uid?:string;
}
