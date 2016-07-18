import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular/index";
@Component({
  templateUrl: 'build/pages/classmates/classmates.html'
})
export class ClassmatesPage {
  mates:Array<{name:string, color:string, dateOfBirth:Date}> = [];

  private myMates = [
    {
      name: 'John',
      color: 'Blue',
      dateOfBirth: new Date('1993-04-12')
    },
    {
      name: 'Bethany',
      color: 'Orange',
      dateOfBirth: new Date('1987-11-04')
    },
    {
      name: 'Arthur',
      color: 'Fallow',
      dateOfBirth: new Date('2000-12-31')
    }
  ];

  constructor(private nav:NavController, navParams:NavParams) {
    for (let i = 0; i < this.myMates.length; i++) {
      this.mates.push(this.myMates[i]);
    }
  }
}
