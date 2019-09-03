export interface Navbar {
	name: string;
	url: string;
}

export interface snackbar {
	duration?: number;
	data: snackbarData;
	horizontalPosition?: MatSnackBarHorizontalPosition;
	verticalPosition?: MatSnackBarVerticalPosition;
	panelClass?: string[];
}
interface snackbarData{
	message:string,
	isAccepted?:any
}
export declare type MatSnackBarHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';
export declare type MatSnackBarVerticalPosition = 'top' | 'bottom';
export declare type acceptance = 'default' | true | false;
