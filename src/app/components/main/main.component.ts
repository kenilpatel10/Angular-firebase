import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { NotesService } from 'src/app/services/notes.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastService } from 'angular-toastify';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  data: any = [];
  notes: any = [];
  Notes: any = [];
  constructor(
    private toast: ToastService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private noteService: NotesService,
    private formbuilder: FormBuilder,
    db: AngularFirestore
  ) {}
  noteForm!: FormGroup;
  filtertext: any;
  username: any = localStorage.getItem('username');
  ngOnInit(): void {
    this.ngxService.start();

    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);
    this.noteService.getNotes().subscribe((res) => {
      console.log(res);
      this.Notes = res.filter((i: any) => {
        return i.userId == localStorage.getItem('userid');
      });
      console.log(this.Notes);
    });
    this.noteForm = this.formbuilder.group({
      title: ['', Validators.required],
      userId: [''],
      createdAt: [''],
    });
  }
  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
    console.log(this.showModal);
  }

  addNote() {
    if (this.noteForm.valid) {
      this.noteForm.patchValue({ userId: localStorage.getItem('userid') });
      this.noteForm.patchValue({ createdAt: Date.now() });
      this.noteService.add(this.noteForm.value);
      this.noteForm.reset();
      this.showModal = false;
    } else {
      this.toast.error('Please fill all fields..');
    }
  }
  deleteNote(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
        this.noteService.deleteNote(id);
      }
    });
  }

  openNote(id: any) {
    this.router.navigate([`/note/${id}`]);
  }
}
