import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { QueryDatabaseService } from '../database-service/query-database.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class AuthguardService implements CanActivate {
	constructor(private af: AngularFireAuth,private router:Router) {}

	canActivate(): Observable<boolean> {
    
    return new Observable(observer=>{
      this.af.authState.subscribe(res=>{
        if(res){
          observer.next(true);
        }
        else if(!res){
          observer.next(false);
          this.router.navigate(['/authentication']);
        }
      })
    })
    
    // if(this.af.auth.currentUser) {
    //   return true
    // } 
    // else{
    //   this.router.navigate(['/authentication']);
    //   return false;
    // }
	}
}
