import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessages } from './validators/errormessages.validator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[ValidationErrorMessages]
})
export class ConfigModule { }
