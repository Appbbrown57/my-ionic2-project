import {Storage, SqlStorage} from "ionic-angular";
import {Classmate} from "./classmate.model";
import {Injectable} from "@angular/core";

@Injectable()
export class ClassmateService {
  private storage:Storage = null;
  private tableName:string = 'classmates';
  private fields:{name:string, type:string, extra?:string}[] = [
    {
      name: 'id',
      type: 'integer',
      extra: 'PRIMARY KEY AUTOINCREMENT'
    },
    {
      name: 'name',
      type: 'text'
    },
    {
      name: 'favoriteColor',
      type: 'text'
    },
    {
      name: 'dateOfBirth',
      type: 'date'
    }
  ];

  public classmates:Classmate[] = [];

  constructor() {
    this.storage = new Storage(SqlStorage);
    let field_str = '';

    for (let field of this.fields) {
      if (field_str) field_str += ',';
      field_str += `${field.name} ${field.type} ${field.extra}`
    }

    this.storage.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (${field_str})`).then(
      () => {
        let count = this.storage.query(`SELECT COUNT(*) count FROM ${this.tableName}`).then(
          (result) => {
            let count = result.res.rows[0].count;
            if (!count) {
              this.save(new Classmate({
                name: 'John',
                favoriteColor: 'Blue',
                dateOfBirth: new Date('1993-04-12')
              }));
              this.refresh();
            }
          }
        );
        this.refresh();
      }
    );
  }

  public refresh() {
    this.getAll().then(
      (result) => {
        this.classmates = result.res.rows
      });
  }

  public save(classmate:Classmate) {
    if (classmate.id) {
      return this.update(classmate);
    }
    else {
      return this.insert(classmate);
    }
  }

  public insert(classmate:Classmate) {
    if (classmate.id) {
      return Promise.reject('Classmate already has an ID');
    }
    else {
      let field_str = '';
      let value_str = '';
      let values = [];

      for (let i in classmate) {
        switch (i) {
          case 'id':
            break;
          default:
            if (field_str) {
              field_str += ',';
              value_str += ',';
            }
            field_str += i;
            value_str += '?';
            values.push(classmate[i]);
            break;
        }
      }
      return this.storage.query(`INSERT INTO ${this.tableName} (${field_str}) VALUES (${value_str})`, values);
    }
  }

  public update(classmate:Classmate) {
    if (classmate.id) {
      let set_str = '';
      let set_values = [];

      for (let i in classmate) {
        switch (i) {
          case 'id':
            break;
          default:
            if (set_str) set_str += ',';
            set_str = `${i} = ?`;
            set_values.push(classmate[i]);
            break;
        }
      }
      return this.storage.query(`UPDATE TABLE ${this.tableName} SET ${set_str}`, set_values);
    }
    else {
      Promise.reject('Missing ID');
    }
  }

  public delete(classmate:Classmate) {
    if (classmate.id) {
      return this.storage.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [classmate.id]);
    }
  }

  public get(id:number) {
    return this.storage.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
  }

  public getAll() {
    return this.storage.query(`SELECT * FROM ${this.tableName}`);
  }
}
