import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first, finalize } from 'rxjs/operators';
import { defaultConst, error_messages } from '../../config/constants/defaultConstants';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root'
})
export class MutationDatabaseService {
	constructor(
		private angularfireauth: AngularFireAuth,
		private angularfirestore: AngularFirestore,
		private http: HttpClient,
		private storage: AngularFireStorage
	) {}

	// setSingleData(){
	//   this.angularfirestore.collection('Person').add({})
	// }

	updateSingleData(EntityName: string, id: string, data: any): Observable<any> {
		return new Observable((observer) => {
			this.angularfirestore
				.collection(EntityName)
				.doc(id)
				.update(data)
				.then((acc) => {
					observer.next(error_messages.updated);
				})
				.catch((err) => {
					observer.next(error_messages.failed);
				});
		});
	}

	httpPost(apiPath, payload): Observable<any> {
		return new Observable((observer) => {
			this.http.post<any>(`${apiPath}`, payload).pipe(first()).subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				},
				() => {
					observer.complete();
				}
			);
		});
	}

	createDataWithUID(entity, uid, payload) {
		let col = this.angularfirestore.collection<any>(entity);
		col.doc(uid).set(payload);
	}
	deleteDataWithUID(entity, uid) {
		let col = this.angularfirestore.collection<any>(entity);
		col.doc(uid).delete();
	}

	uploadFileToFirebase(filepath, file): Observable<any> {
		return new Observable((obs) => {
			const ref = this.storage.ref(filepath);
			this.storage
				.upload(filepath, file)
				.snapshotChanges()
				.pipe(
					finalize(() => {
						ref.getDownloadURL().subscribe(
							(url) => {
								obs.next(url);
							},
							(err) => {
								obs.error(err);
							}
						);
					})
				)
				.subscribe();
		});
	}
}
