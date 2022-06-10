import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(private db: AngularFireDatabase) { }

  addDocs(formValue: any) {
    this.db.list('/docs').push(formValue);
  }
  getDocs(){
    return this.db.list('/docs').snapshotChanges().pipe(
      map((exp: any[]) => exp.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }
  deleteDoc(id: any) {
    this.db.list('/docs/'+id).remove();
  }
}
