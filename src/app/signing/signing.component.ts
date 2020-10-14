
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digital } from './signing';
import { SignatureService } from '../signing/signature.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent implements OnInit {
  digital1: digital[];
  mode = '';
  mode1 = '';
  mode2 = '';
  mode3 = '';
  mode4 = '';
  mode5 = '';
  imageSrc = '';
  messageText = '';
  form: FormGroup;
  constructor(private fb: FormBuilder, private signservice: SignatureService) {
    this.form = this.fb.group({
      FileType: [''],
      FilePages: [''],
      FileSize: [''],
      FileType1: [''],
      FilePages1: [''],
      FileSize1: [''],
      CurrentApprover: ['', Validators.required]
    });
  }


  imageButtons: any[] = [{
    src: '../../assets/image/vsign/letter1.jpg', name: 'image - 2'
  },
  { src: '../../assets/image/vsign/letter2.png', name: 'image-3' }, { src: '../../assets/image/vsign/letter3.png', name: 'image-4' }];


  ngOnInit(): void {
    this.signservice.getDB().subscribe(
      (data) => {
        console.log(data);
        this.digital1 = data;
        this.mode = this.digital1[0].FileType;
        this.mode1 = this.digital1[0].FilePages;
        this.mode2 = this.digital1[0].FileSize;
        this.mode3 = this.digital1[1].FileType;
        console.log(this.mode3);

        this.mode4 = this.digital1[1].FilePages;
        this.mode5 = this.digital1[1].FileSize;
        console.log(this.mode4);
        console.log(this.mode5);
        // this.mode3 = this.digital1[0].CurrentApprover;
        (err) => console.log(err)
      }
      // console.log(this.employee);
    );
  }
  onClick(imagebutton) {
    this.imageSrc = imagebutton.src;
    this.messageText = imagebutton.name;
  }
}
