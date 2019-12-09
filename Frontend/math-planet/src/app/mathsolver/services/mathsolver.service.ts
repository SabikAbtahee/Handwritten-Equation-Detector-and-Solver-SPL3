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
import { parse } from 'querystring';
@Injectable({
	providedIn: 'root'
})
export class MathsolverService {
	algebra = require('algebra.js');

	constructor(
		private coreMutate: MutationDatabaseService,
		private coreQuery: QueryDatabaseService,
		private sharedService: SharedService
	) {}

	predictImage(payload): Observable<any> {
		return this.coreMutate.httpPost(apiRoutes.predict, payload);
	}

	predictBase64(payload): Observable<any> {
		return this.coreMutate.httpPost(apiRoutes.predictBase64, payload);
	}

	solve(parsed) {
		var eq = this.algebra.parse(parsed);
		if (this.checkIfEquation(eq)) {
			return this.solveEquation(eq);
		} else if (this.checkIfExpression(eq)) {
			return this.solveExpression(eq);
		} else {
			return 'Sorry Cannot solve, try again';
		}
	}

	solveEquation(parsed) {
		let ansX = '',
			ansY = '',
			answer = '';
		let equ = parsed.toString();
		for (let i of equ) {
			if (i == 'x') {
				let X = parsed.solveFor('x');
				if (X && X[0] && X[1]) {
					ansX = `${Number(X[0]).toFixed(2)} , ${Number(X[1]).toFixed(2)}`;
				} else {
					ansX = X;
				}
			} else if (i == 'y') {
				let Y = parsed.solveFor('y');
				if (Y && Y[0] && Y[1]) {
					ansY = `${Number(Y[0]).toFixed(2)} , ${Number(Y[1]).toFixed(2)}`;
				} else {
					ansY = Y;
				}
			}
		}
		if (ansX != '' && ansY != '') {
			answer = `X:${ansX} , Y:${ansY}`;
		} else if (ansX != '') {
			answer = `X:${ansX}`;
		} else if (ansY != '') {
			answer = `Y:${ansY}`;
		}

		return answer ? answer : 'No solution';
	}

	solveExpression(parsed) {
		let answer;
		answer=parsed.simplify();
		return answer.toString();
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
	checkIfEquation(parsed) {
		let equ = parsed.toString();
		for (let i of equ) {
			if (i == '=') {
				return true;
			}
		}
		return false;
	}

	checkIfExpression(parsed) {
		let equ = parsed.toString();
		for (let i of equ) {
			if (i == '=') {
				return false;
			}
		}
		return true;
	}

	saveContent(content: Content) {
		this.coreMutate.createDataWithUID(Entities.Content, content.uid, content);
	}

	uploadFileToFirebase(filepath, file): Observable<any> {
		return new Observable((obs) => {
			this.coreMutate.uploadFileToFirebase(filepath, file).subscribe(
				(res) => {
					obs.next(res);
				},
				(err) => {
					obs.error(err);
				}
			);
		});
	}

	getUserId(): Observable<any> {
		return new Observable((obs) => {
			this.coreQuery.getLoggedInUserID().subscribe(
				(res) => {
					obs.next(res);
				},
				(err) => {
					obs.error(err);
				}
			);
		});
	}
}
