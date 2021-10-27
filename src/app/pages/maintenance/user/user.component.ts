import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';

import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit, OnDestroy {
  public totalUser: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs!: Subscription;
  public upto: number = 0;
  public loading: boolean = true;

  constructor(private userSV: UserService, 
              private searchSV: SearchService,
              private modal: ModalImageService) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

    this.imgSubs = this.modal.newImage.pipe(
      delay(100)
    ).subscribe(img => this.loadUsers())
  }

  loadUsers() {
    this.loading = true;

    this.userSV.loadUser(this.upto).subscribe(({ total, users }) => {
      this.totalUser = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.upto += value;

    if (this.upto < 0) {
      this.upto = 0;
    } else if (this.upto >= this.totalUser) {
      this.upto -= value;
    }

    this.loadUsers();
  }

  search(term: string): any {
    if (term.length <= 0) {
      return (this.users = this.usersTemp);
    }

    // this.searchSV.search('users', term)
    this.searchSV.search('users', term).subscribe((resp: any[]) => {
      this.users = resp;
    });
  }

  deleteUser(user: User): any {

    if (user.uid === this.userSV.uid) {
      return Swal.fire('Error','You can delete yourself','error')
    }

    Swal.fire({
      title: 'Delete User?',
      text: `You are going to delete ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userSV.deleteUser(user).subscribe((resp) => {
          Swal.fire(
            'Deleted!',
            `Your user ${user.name} has been deleted.`,
            'success'
          );

          this.loadUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    this.userSV.saveUser(user).subscribe(
      resp => {
        console.log(resp);
      }
    )
  }

  openModal(user: User) {
    this.modal.openModal('users', user.uid!, user.img);
  }


}
