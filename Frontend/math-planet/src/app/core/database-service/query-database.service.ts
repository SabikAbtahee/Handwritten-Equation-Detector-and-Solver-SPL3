import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class QueryDatabaseService {
	constructor(private angularfireauth: AngularFireAuth, private angularfirestore: AngularFirestore) {}

	getLoggedInUserID(): Observable<any> {
		return new Observable((observer) => {
			this.angularfireauth.authState.pipe(first()).subscribe(
				(res) => {
					observer.next(res && res.uid ? res.uid : null);
				},
				(err) => observer.error(err),
				() => observer.complete()
			);
		});
	}

	getSingleData(collectionName: string, documentId:string): Observable<any> {
		return new Observable((observer) => {
			this.angularfirestore.collection(collectionName).doc(documentId).get().pipe(first()).subscribe(
				(res) => {
					observer.next(res.data()?res.data():null);
				},
				(err) => observer.error(err),
				() => observer.complete()
			);
		});
	}
}
