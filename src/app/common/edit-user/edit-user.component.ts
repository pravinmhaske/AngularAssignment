import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { User } from "../../model/user.model";
import { ApiService } from "./../../service/api.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      id: [''],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
    let obj = window.localStorage.getItem("user");
    const tempObj = JSON.parse(obj);
    let frmCntrls = delete tempObj["isAdmin"];
    this.editForm.setValue(tempObj);
    this.editForm.updateValueAndValidity();
    // this.apiService.getUserById(+userId)
    //   .subscribe(data => {
    //     console.log(" edit ", data)

    //   });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            alert('User updated successfully.');
            this.router.navigate(['user-list']);
          } else {
            alert("Error");
          }
        },
        error => {
          alert(error);
        });
  }

}

export default EditUserComponent;
