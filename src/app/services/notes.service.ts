import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient,private db: AngularFireDatabase) { }


add(formValue: any) {
  this.db.list('/notes').push(formValue);
}
deleteNote(id: any) {
  this.db.list('/notes/'+id).remove();
}
getNotes(){
  return this.db.list('/notes').snapshotChanges().pipe(
    map((products: any[]) => products.map(prod => {
      const payload = prod.payload.val();
      const key = prod.key;
      return <any>{ key, ...payload };
    })),
  );
}
getOneNote(id: any){
  return this.db.object('/notes/'+id).valueChanges( )
}
addNotes(formValue: any){
  this.db.list('/tasks/').push(formValue);
}
updateNotes(id: any ,data: any){
  this.db.object('/tasks/'+id).update(data);
}

getOneTask(){
  return this.db.list('/tasks').snapshotChanges().pipe(
    map((products: any[]) => products.map(prod => {
      const payload = prod.payload.val();
      const key = prod.key;
      return <any>{ key, ...payload };
    })),
  );
  }
}
