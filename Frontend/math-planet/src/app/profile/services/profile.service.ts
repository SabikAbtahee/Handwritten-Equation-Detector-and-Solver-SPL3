import { Injectable } from '@angular/core';
import { UserInformation } from '../../config/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { errorMessages } from '../../config/validators/errormessages.constants';
import { QueryDatabaseService } from '../../core/database-service/query-database.service';
import { first, switchMap } from 'rxjs/operators';
import { defaultConst } from 'src/app/config/constants/defaultConstants';
import { Entities } from 'src/app/config/enums/default.enum';
import { ObserversModule } from '@angular/cdk/observers';
import { MutationDatabaseService } from 'src/app/core/database-service/mutation-database.service';
import { MatDialog } from '@angular/material';
import { PasswordChangeComponent } from '../components/password-change/password-change.component';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RootService } from 'src/app/root/services/root.service';
import { ProfilePictureUploadComponent } from '../components/profile-picture-upload/profile-picture-upload.component';
@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	constructor(
		private afauth: AngularFireAuth,
		private query: QueryDatabaseService,
		private mutate: MutationDatabaseService,
		private util: UtilityService,
		private sharedService: SharedService,
		private rootService:RootService,
		public dialog: MatDialog
	) {}

	updatePassword(oldpassword: string, newpassword: string) {
		const currentEmail = this.afauth.auth.currentUser.email;
		this.afauth.auth
			.signInWithEmailAndPassword(currentEmail, oldpassword)
			.then((res) => {
				if (res && res.user && res.user.emailVerified) {
					this.afauth.auth.currentUser.updatePassword(newpassword);
					// observer.next(errorMessages.password_updated);
					this.openUpdatedSnackBar();
				} else {
					// observer.next(errorMessages.verify_email);
					this.openErrorSnackBar('Verify Email');
					this.util.resendVerificationEmail();
				}
			})
			.catch((err) => {
				this.openErrorSnackBar('Failed. Wrong credential');
				// observer.next(err && err.code);
			});
	}

	getProfileInformation(): Observable<any> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					observer.next(res2);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}

	updateProfileInformation(entity, id, data) {
		this.mutate.updateSingleData(entity, id, data).pipe(first()).subscribe((response) => {
			if (response == errorMessages.updated) {
				this.openUpdatedSnackBar();
				debugger;
				if (data && data.name) {
					
					this.rootService.$Username.next(data.name);
				}
			} else {
				this.openErrorSnackBar();
			}
		});
	}

	touchAllfields(formgroup: FormGroup) {
		this.util.touchAllFieldsOfForm(formgroup);
	}

	openUpdatedSnackBar() {
		this.sharedService.openSnackBar({
			data: { message: errorMessages.updated, isAccepted: true },
			duration: 2,
			panelClass: [ 'default-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}
	openErrorSnackBar(message?: string) {
		this.sharedService.openSnackBar({
			data: { message: message ? message : errorMessages.error, isAccepted: false },
			duration: 2,
			panelClass: [ 'default-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}


	
}
