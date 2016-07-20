import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular/index";
import {Classmate} from "../shared/classmate/classmate.model";
@Component({
  templateUrl: 'build/pages/classmate/classmate.html'
})
export class ClassmatePage {
  classmate:Classmate;

  constructor(private nav:NavController, navParams:NavParams) {
    this.classmate = navParams.get('classmate');
  }
}
