import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryDatabaseService } from './database-service/query-database.service';
import { UtilityService } from './utility-service/utility.service';
import { MutationDatabaseService } from './database-service/mutation-database.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers:[
    MutationDatabaseService,
    QueryDatabaseService,
    UtilityService,
  ]

})
export class CoreModule { }
