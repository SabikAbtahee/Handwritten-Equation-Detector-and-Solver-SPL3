import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { UserInformation, CustomerUserInformation } from '../../config/interfaces/user.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Entities } from '../../config/enums/default.enum';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import { FormGroup } from '@angular/forms';
@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private angularfireauth: AngularFireAuth, private angularfirestore: AngularFirestore,private util:UtilityService) {}

	signUp(user: UserInformation): Observable<any> {
		return new Observable((observer) => {
			this.angularfireauth.auth
				.createUserWithEmailAndPassword(user.email, user.password)
				.then((accepted) => {
					user.metaData.uid = accepted.user.uid;
					this.createCustomUser(user.metaData);
					this.sendEmailVerification();
					observer.next(accepted);
				})
				.catch((err) => {
					observer.next(err);
				});
		});
	}

	sendEmailVerification(){
		this.angularfireauth.auth.currentUser.sendEmailVerification();
	}

	signOut() {
		this.angularfireauth.auth.signOut();
	}

	createCustomUser(user: CustomerUserInformation) {
		let personCollection = this.angularfirestore.collection<UserInformation>(Entities.Person);
		personCollection.doc(user.uid).set(user);
	}

	signin(user: UserInformation): Observable<any> {
		return new Observable((observer) => {
			this.angularfireauth.auth
				.signInWithEmailAndPassword(user.email, user.password)
				.then((acc) => {
					observer.next(acc);
				})
				.catch((err) => {
					observer.next(err);
				});
		});
	}

	getCurrentUser(){
		return this.angularfireauth.auth.currentUser;
	}

	sendPasswordResetEmail(user:UserInformation):Observable<any>{
		return new Observable(observer=>{
			this.angularfireauth.auth.sendPasswordResetEmail(user.email).then(acc=>{
				observer.next(acc);
			}).catch(err=>{
				observer.next(err);
			});
		});

	}

	touchAllfields(group:FormGroup){
		this.util.touchAllFieldsOfForm(group);
	}
}
