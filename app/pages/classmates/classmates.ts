import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular/index";
import {ClassmateService} from "./classmate.service";
import {Classmate} from "./classmate.model";
@Component({
  templateUrl: 'build/pages/classmates/classmates.html',
  providers: [ClassmateService]
})
export class ClassmatesPage {
  constructor(private nav:NavController, navParams:NavParams, private classmateService:ClassmateService) {
  }

  get mates():Classmate[] {
    return this.classmateService.classmates;
  }
}
