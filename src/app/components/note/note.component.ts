import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotesService } from 'src/app/services/notes.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  public Editor = ClassicEditor;
  public notes = {
    task: '',
    noteId: '',
  };
  constructor(
    private noteService: NotesService,
    private params: ActivatedRoute,
    private ngxService : NgxUiLoaderService,
    private formbuilder: FormBuilder
  ) {}
  noteForm!: FormGroup;
  id: any;
  show: boolean = false;
  isUpdate: boolean = false;
  tasks: any;
  note: any;
  data: any;
  ngOnInit(): void {
    this.ngxService.start(); 
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);
    this.id = this.params.snapshot.params['id'];
    this.notes.noteId = this.id;

    this.noteService.getOneNote(this.id).subscribe((res) => {
      console.log(res);
      this.note = res;
    });

    this.noteService.getOneTask().subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks.noteId);
      this.tasks.filter((i: any) => {
        if (this.id === i.noteId) {
          this.data = i;
          this.show = true;
          console.log(this.data);
        } else {
          this.show = false;
        }
      });
      console.log('res', this.tasks);
    });
  }

  addNote() {
    this.noteService.addNotes(this.notes);
  }

  updateNote() {
    this.noteService.updateNotes(localStorage.getItem('isEdit'), this.notes);
    this.isUpdate = false;
  }
  onEdit(id: any) {
    console.log('edit', id);
    localStorage.setItem('isEdit', id);
    this.isUpdate = true;
    this.noteService.getOneTask().subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks.noteId);
      this.tasks.filter((i: any) => {
        if (this.id === i.noteId) {
          this.data = i;
          this.show = true;
          console.log(this.data);
          this.notes = this.data;
        } else {
          this.show = false;
        }
      });
      console.log('res', this.tasks);
    });
    console.log(this.isUpdate);
  }
  getTasks() {}
}
