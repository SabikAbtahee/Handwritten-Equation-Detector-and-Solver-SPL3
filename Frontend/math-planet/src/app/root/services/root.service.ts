import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  $Username = new BehaviorSubject('');
  // $username= this.Username.asObservable();
  $menuIndex = new BehaviorSubject<number>(1);
  constructor() { }
}
