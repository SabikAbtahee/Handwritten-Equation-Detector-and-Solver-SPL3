import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryDatabaseService } from './database-service/query-database.service';
import { UtilityService } from './utility-service/utility.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    QueryDatabaseService,
    UtilityService,
  ]

})
export class CoreModule { }
