import { httpHeader, apiRoutes } from './../../config/constants/defaultConstants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MutationDatabaseService } from '../../core/database-service/mutation-database.service';

@Injectable({
  providedIn: 'root'
})
export class MathsolverService {

  constructor(private coreMutate:MutationDatabaseService) { }

  predictImage(payload):Observable<any>{
    return this.coreMutate.httpPost(apiRoutes.predict,payload);
  }

  predictBase64(payload):Observable<any>{
    return this.coreMutate.httpPost(apiRoutes.predictBase64,payload);
  }
}
