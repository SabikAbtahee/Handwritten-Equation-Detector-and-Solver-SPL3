import { Observable } from 'rxjs';
import { Entities } from './../../config/enums/default.enum';
import { QueryDatabaseService } from './../../core/database-service/query-database.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	constructor(private queryService: QueryDatabaseService) {}

	getHistory(id): Observable<any> {
		return new Observable((obs) => {
			this.queryService.getListDataWhereEquals(Entities.Content, 'userId', id).subscribe(
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
			this.queryService.getLoggedInUserID().subscribe(
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
