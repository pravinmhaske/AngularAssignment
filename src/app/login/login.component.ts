import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../service/api.service";
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private http: HttpClient) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.apiService.login(loginPayload).subscribe(data => {
      if (data) {
        window.localStorage.setItem('userName', data.userName);
        window.localStorage.setItem('isAuthenticated', "true");
        if (data.isAdmin) {
          localStorage.setItem("admin", "true")
        }
        this.router.navigate(['user-list']);
      } else {
        window.localStorage.setItem('isAuthenticated', "false");
        alert("Error while login");
      }
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
export default LoginComponent;