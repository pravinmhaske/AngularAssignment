import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../model/user.model";
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

import { ApiService } from "./../../service/api.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: any;
  constructor(private router: Router, private apiService: ApiService, private http: HttpClient) { }

  ngOnInit() {
    this.apiService.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(" useres ", this.users)
      });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    // window.localStorage.setItem("editUserId", user.id.toString());
    window.localStorage.setItem("user", JSON.stringify(user));
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}

export default ListUsersComponent;
