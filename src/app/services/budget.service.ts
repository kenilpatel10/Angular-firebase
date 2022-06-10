import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private db : AngularFireDatabase) { }

  addExpense(formValue: any) {
    this.db.list('/budget').push(formValue);
  }

  deleteExpense(id: any) {
    this.db.list('/budget/'+id).remove();
  }
  getExpenses(){
    return this.db.list('/budget').snapshotChanges().pipe(
      map((exp: any[]) => exp.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }
}
