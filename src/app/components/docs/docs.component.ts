import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';
import { DocsService } from 'src/app/services/docs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit {
  showModal = false;
  docForm!: FormGroup;
  imgSrc: string = '';
  pdfSrc: string = '/pdf-test.pdf';
  selectedImage: any = null;
  docs: any;
  constructor(
    private docService: DocsService,
    private ngxService: NgxUiLoaderService,
    private formbuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {}
  isImage: boolean = false;
  isDoc: boolean = false;
  ngOnInit(): void {
    this.ngxService.start();
    console.log('isdoc', this.isDoc);
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);

    this.docService.getDocs().subscribe((res) => {
      console.log('all doc', res);
      this.docs = res.filter((i: any)=>{
        return i.userId === localStorage.getItem('userid')
      }) 
      console.log('all doc22', this.docs);
    });

    this.docForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(15)]],
      file: ['', Validators.required],
      type: ['', Validators.required],
      userId: [''],
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  addDoc() {
    var filePath = `uploads/${this.selectedImage.name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: any) => {
            console.log(url, 'url');
            this.docForm.patchValue({ userId: localStorage.getItem('userid') });
            this.docForm.patchValue({ file: url });
      
              this.docService.addDocs(this.docForm.value);
              this.docForm.reset();
              this.showModal = false;
            
          });
        })
      )
      .subscribe((res: any) => {
        console.log('image', res);
      });
  }
  onImage() {
    this.isImage = true;
    this.isDoc = false;
  }
  onDoc() {
    this.isImage = false;
    this.isDoc = true;
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
    } else {
      this.imgSrc = '/assets/angular.jpg';
      this.selectedImage = null;
    }
  }
  deleteDoc(id: any) {
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
        Swal.fire('Deleted!', 'Your document has been deleted.', 'success');
        this.docService.deleteDoc(id);
      }
    });
  }
}
