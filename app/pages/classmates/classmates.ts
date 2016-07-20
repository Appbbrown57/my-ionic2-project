import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular/index";
import {ClassmateService} from "../shared/classmate/classmate.service";
import {Classmate} from "../shared/classmate/classmate.model";
import {ClassmatePage} from "../classmate/classmate";
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

  classmateTapped(event, classmate) {
    this.nav.push(ClassmatePage, {
      classmate: classmate
    })
  }
}
