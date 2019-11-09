import { httpHeader, apiRoutes } from './../../config/constants/defaultConstants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MutationDatabaseService } from '../../core/database-service/mutation-database.service';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class MathsolverService {
  algebra = require('algebra.js');

  constructor(private coreMutate:MutationDatabaseService) { }

  predictImage(payload):Observable<any>{
    return this.coreMutate.httpPost(apiRoutes.predict,payload);
  }

  predictBase64(payload):Observable<any>{
    return this.coreMutate.httpPost(apiRoutes.predictBase64,payload);
  }

  solveEquation(equation){
    var eq = this.algebra.parse(equation);
    var ans =eq.solveFor('x');
    return ans.toString();
  }

  saveFile(f,filename){
    let FileSaver = require('file-saver');
    FileSaver.saveAs(f,filename);
    
  }

  checkIfEquation(){

  }

  checkIfExpression(){
    
  }
}
