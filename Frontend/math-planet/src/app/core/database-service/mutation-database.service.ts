import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { defaultConst, error_messages } from '../../config/constants/defaultConstants';

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
        observer.next(error_messages.updated);
      }).catch(err=>{
        observer.next(error_messages.failed);
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
