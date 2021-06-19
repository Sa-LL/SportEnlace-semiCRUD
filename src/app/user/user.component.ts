import { Component, OnInit } from '@angular/core';
import { UserModel } from './user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

interface Data {
  id: number;
  name: string;
  doc: string;
  profile: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userModelObject: UserModel = new UserModel();
  formValue!: FormGroup;
  userData!: Data[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      doc: [''],
      profile: [''],
    });
    this.getAllUsers();
  }

  // POST
  postUserDetails() {
    this.userModelObject.name = this.formValue.value.name;
    this.userModelObject.doc = this.formValue.value.doc;
    this.userModelObject.profile = this.formValue.value.profile;

    this.userService.postUser(this.userModelObject).subscribe(
      (res) => {
        console.log(res);
        alert('User created successfully!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUsers();
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }

  //GET
  getAllUsers() {
    this.userService.getUser().subscribe((res) => {
      this.userData = res.data;
    });
  }
}
