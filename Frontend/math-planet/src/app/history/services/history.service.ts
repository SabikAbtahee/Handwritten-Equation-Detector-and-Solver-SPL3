import { Observable } from 'rxjs';
import { Entities } from './../../config/enums/default.enum';
import { QueryDatabaseService } from './../../core/database-service/query-database.service';
import { Injectable } from '@angular/core';
import { MutationDatabaseService } from 'src/app/core/database-service/mutation-database.service';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	constructor(private queryService: QueryDatabaseService,private mutateService:MutationDatabaseService) {}

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
  
  deleteData(uid){
    this.mutateService.deleteDataWithUID(Entities.Content,uid);
  }
}
