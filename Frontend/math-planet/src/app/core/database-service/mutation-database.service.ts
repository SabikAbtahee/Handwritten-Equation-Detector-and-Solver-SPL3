import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { errorMessages } from 'src/app/config/validators/errormessages.constants';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MutationDatabaseService {

  constructor(private angularfireauth: AngularFireAuth, private angularfirestore: AngularFirestore,private http:HttpClient) { }

  // setSingleData(){
  //   this.angularfirestore.collection('Person').add({})
  // }

  updateSingleData(EntityName:string,id:string,data:any):Observable<any>{
    return new Observable(observer=>{
      this.angularfirestore.collection(EntityName).doc(id).update(data).then(acc=>{
        observer.next(errorMessages.updated);
      }).catch(err=>{
        observer.next(errorMessages.error);
      });
    })
    
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

}
