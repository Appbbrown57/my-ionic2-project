export class Classmate {
  id:number;
  name:string;
  favoriteColor:string;
  dateOfBirth:Date;

  constructor(classmate:{id?:number, name:string, favoriteColor:string, dateOfBirth:Date}) {
    if (classmate.id) this.id = classmate.id;
    this.name = classmate.name;
    this.favoriteColor = classmate.favoriteColor;
    this.dateOfBirth = classmate.dateOfBirth;
  }
}
