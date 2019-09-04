import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PasswordChangeComponent } from '../components/password-change/password-change.component';
import { ProfilePictureUploadComponent } from '../components/profile-picture-upload/profile-picture-upload.component';
@Injectable({
	providedIn: 'root'
})
export class PasswordModalService {
	constructor(public dialog: MatDialog) {
		
		
	}

	openPasswordChangeModal(width?: string) {
		const dialogRef = this.dialog.open(PasswordChangeComponent, {
			
			minWidth:'450px',
			width: width ? width : '35vw'
			// height:'60vh'
		});

		// dialogRef.afterClosed().subscribe(result => {
		// console.log('The dialog was closed',result);
		// });
	}
	openProfilePictureModal(width?: string) {
		const dialogRef = this.dialog.open(ProfilePictureUploadComponent, {
			
			minWidth:'450px',
			width: width ? width : '35vw'
			// height:'60vh'
		});

		// dialogRef.afterClosed().subscribe(result => {
		// console.log('The dialog was closed',result);
		// });
	}
}
