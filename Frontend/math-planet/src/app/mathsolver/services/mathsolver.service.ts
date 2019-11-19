import { SharedService } from './../../shared/services/shared.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Content } from './../../config/interfaces/content.interface';
import { QueryDatabaseService } from './../../core/database-service/query-database.service';
import { httpHeader, apiRoutes } from './../../config/constants/defaultConstants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MutationDatabaseService } from '../../core/database-service/mutation-database.service';
import { saveAs } from 'file-saver';
import { first } from 'rxjs/operators';
import { Entities } from '../../config/enums/default.enum';
@Injectable({
	providedIn: 'root'
})
export class MathsolverService {
	algebra = require('algebra.js');

	constructor(private coreMutate: MutationDatabaseService, private coreQuery: QueryDatabaseService,private sharedService:SharedService) {}

	predictImage(payload): Observable<any> {
		return this.coreMutate.httpPost(apiRoutes.predict, payload);
	}

	predictBase64(payload): Observable<any> {
		return this.coreMutate.httpPost(apiRoutes.predictBase64, payload);
	}

	solveEquation(equation) {
		var eq = this.algebra.parse(equation);
		var ans = eq.solveFor('x');
		return ans.toString();
	}

	saveFile(f, filename) {
		let FileSaver = require('file-saver');
		FileSaver.saveAs(f, filename);
	}

	isUserLoggedIn(): Observable<any> {
		return new Observable((observer) => {
			this.coreQuery.getLoggedInUserID().pipe(first()).subscribe(
				(res) => {
					if (res) {
						observer.next(true);
					} else {
						observer.next(false);
					}
				},
				(err) => {
					observer.error(err);
				}
			);
		});
	}
	checkIfEquation() {}

	checkIfExpression() {}

	saveContent(content:Content){
		this.coreMutate.createDataWithUID(Entities.Content,content.uid,content);
	}
	
	uploadFileToFirebase(filepath,file):Observable<any>{
		return new Observable(obs=>{
			this.coreMutate.uploadFileToFirebase(filepath,file).subscribe(res=>{
				obs.next(res);
			},err=>{
				obs.error(err);
			});
		})
		
	}

	getUserId():Observable<any>{
		return new Observable(obs=>{
			this.coreQuery.getLoggedInUserID().subscribe(res=>{
				obs.next(res);
			},
			err=>{
				obs.error(err);
			})
		})
		
	}

}
