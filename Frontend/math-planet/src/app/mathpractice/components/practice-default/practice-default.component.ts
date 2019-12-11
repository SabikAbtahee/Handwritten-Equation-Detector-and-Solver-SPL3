import { DifficultyLevel } from './../../../config/constants/defaultConstants';
import { PracticeService } from './../../services/practice.service';
import { UtilityService } from '../../../core/utility-service/utility.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquationQuestion as QuestionInterface } from '../../../config/interfaces/mathplanet.interface';
import { generate } from 'rxjs';
@Component({
  selector: 'app-practice-default',
  templateUrl: './practice-default.component.html',
  styleUrls: ['./practice-default.component.scss']
})
export class PracticeDefaultComponent implements OnInit {
  questionForm:FormGroup;
  questionNumbers= [
    {value: '12', viewValue: '12'},
    {value: '24', viewValue: '24'},
    {value: '32', viewValue: '32'}
  ];
  difficulty= [
    {value: 'easy', viewValue: 'Easy'},
    {value: 'average', viewValue: 'Average'},
    {value: 'hard', viewValue: 'Hard'}
  ];
  questionNumber;
  minimumDifficulty;
  maximumDifficulty;
  Difficulty=DifficultyLevel;
  IsQuizRunning:boolean=false;
  GeneratedQuestions=[];
  constructor(private fb:FormBuilder,private sharedService:SharedService,private utility:UtilityService,private practiceService:PracticeService) { }

  ngOnInit() {
    this.makeQuestionForm();
  }

  generateQuestions(){
    if(!this.questionForm.invalid){
      this.questionNumber=this.questionForm.get('questionNumbers').value;
      this.minimumDifficulty=this.Difficulty[this.questionForm.get('difficulty').value].minimum;
      this.maximumDifficulty=this.Difficulty[this.questionForm.get('difficulty').value].maximum;
      this.generate();
    }
    else{
      this.utility.touchAllFieldsOfForm(this.questionForm);
    }
  }
  generate(){
    let loop=this.questionNumber;
    for(let i = 0; i < loop; i++){
      this.GeneratedQuestions.push(this.makeRandomEquation());
    }
  }

  makeQuestionForm(){
    this.questionForm=this.fb.group({
      questionNumbers:['',Validators.required],
      difficulty:['',Validators.required]
    });
  }

  makeRandomEquation(){
    let a,x,b,d,c;
    a=this.practiceService.getRandomIntWithinRange(this.minimumDifficulty,this.maximumDifficulty);
    b=this.practiceService.getRandomIntWithinRange(this.minimumDifficulty,this.maximumDifficulty);
    x=this.practiceService.getRandomIntWithinRange(this.minimumDifficulty,this.maximumDifficulty);
    d=this.practiceService.getRandomIntWithinRange(this.minimumDifficulty,this.maximumDifficulty)
    c=this.practiceService.getCGivenabxd(a,b,x,d);
    let equ=this.practiceService.makeStringGivenABCD(a,b,c,d);
    
    let EquObject:QuestionInterface={
      parsed:equ,
      solution:x
    };
    return EquObject;
  }

  makeRandomExpression(){

  }

  makeDifferentiationExpression(){

  }

  makeIntegrationExpression(){

  }



}
