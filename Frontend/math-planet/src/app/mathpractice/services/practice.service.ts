import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
	atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt,parser
  } from 'mathjs'
@Injectable({
	providedIn: 'root'
})
export class PracticeService {
    mathsteps = require('mathsteps');
	algebra = require('algebra.js');

	constructor() {
	}

	getRandomIntWithinRange(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		let final = Math.floor(Math.random() * (max - min)) + min;
		if (final == 0) {
			return final + 1;
		} else {
			return final; //The maximum is exclusive and the minimum is inclusive
		}
	}

	makeStringGivenABCD(a, b, c, d) {
		let finalEquation = ``;
		let dif = c - d;
		if (a == 1) {
			finalEquation += `x^2`;
		} else if (a == -1) {
			finalEquation += `-x^2`;
		} else {
			finalEquation += `${a}x^2`;
		}
		if (b > 0) {
			if (b == 1) {
				finalEquation += `+x`;
			} else {
				finalEquation += `+${b}x`;
			}
		}
		if (b < 0) {
      if (b == -1) {
				finalEquation += `-x`;
			} else {
        finalEquation += `${b}x`;
			}
			// finalEquation += `${b}x`;
		}
		if (dif > 0) {
			finalEquation += `+${dif}`;
		}
		if (dif < 0) {
			finalEquation += `${dif}`;
		}
		finalEquation += '=0';

		return finalEquation;
	}

	getCGivenabxd(a, b, x, d) {
		let c;
		c = d - (a * x ** 2 + b * x);
		return c;
	}

	solveEquationConfirmed(parsed) {
		parsed=this.algebra.parse(parsed);
		let X = parsed.solveFor('x');
		let answer=[];
		if(X && X[0]){
			answer.push(X[0].toString());
		}
		if(X && X[1]){
			answer.push(X[1].toString());

		}
		return answer;
	}
	
}
