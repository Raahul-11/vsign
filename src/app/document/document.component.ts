import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../document/document.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

function readBase64(file) {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener('load', function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener('error', function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
}

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit {

  done: any = [{
    name: 'User Name 1',
    id: 'HR Head'
  },
  {
    name: 'User Name 2',
    id: 'Finance Manager'
  },
  {
    name: 'User Name 3',
    id: 'Controller'
  }
  ];
  removeItem(i: number): void {
    this.done.splice(i, 1);
  }

  // onremove(i: number): void {
  //   console.log(i);
  //   this.data.splice(i, 1);
  // }
  // onremove(i): void {
  //   const index: number = this.done.indexOf(i);
  //   if (index !== -1) {
  //     this.done.splice(index, 1);
  //   }
  // }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  files: File[] = [];
  name: string[] = [];
  // tslint:disable-next-line: member-ordering
  options: UploaderOptions;
  // tslint:disable-next-line: member-ordering
  formData: FormData;
  files1: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  // tslint:disable-next-line:typedef
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  selected = 'option2';
  selected1 = 'option2';
  constructor(private router: Router, private service: DocumentService) {
    this.files1 = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }


  ngOnInit(): void {
  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files1.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files1.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files1[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files1 = this.files1.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }

  startUpload(): void {

    this.service.postmethod(this.files1)
      .subscribe(
        Response => {
          console.log('sucess', Response);
        },
        error => console.log('error!', error)
      );

    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:50763/api/addDocH',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
    this.router.navigate(['signing']);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
