import { IUserInterface } from './../interfaces/signup.interface';
import { SnakBarService } from 'src/app/shared/services/snak.bar.service';
import { IApiResponseInterface } from 'src/app/shared/interfaces/api.response.interface';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userInformation: [IUserInterface];
  cardXCord: number;
  cardYCord: number;
  cardPosition = {
    position: 'absolute',
    top: '0px',
    left: '0px'
  };
  isCardVisible = false;
  currentSelectedUserInformation: IUserInterface;
  constructor(
    private _route: Router,
    private _userService: UserService,
    private _snackBarService: SnakBarService
  ) { }

  ngOnInit(): void {
    this.getAllUserInformation();
  }

  getAllUserInformation(): void {
    this._userService?.getAllUserList().subscribe((apiResponse: IApiResponseInterface) => {
      this.userInformation = apiResponse?.data;
    }, error => {
      this._snackBarService.error(error?.error?.errors);
      this._route.navigate(['/user']);
    });
  }

  onNameHover(event: any, eachUserName: IUserInterface): void {
    this.cardXCord = event?.clientX;
    this.cardYCord = event?.clientY;
    this.cardPosition.left = this.cardXCord.toString() + 'px';
    this.cardPosition.top = this.cardYCord.toString() + 'px';
    this.isCardVisible = true;
    this.currentSelectedUserInformation = eachUserName;
  }

  onNameOut(): void {
    this.isCardVisible = false;
  }

  deleteUser(currentUserInformation: IUserInterface): void {
    if (currentUserInformation?.isActive) {
      this._userService?.deleteUserItem(currentUserInformation?._id).subscribe( (apiResponse: IApiResponseInterface) => {
        if (apiResponse?.status) {
          this._snackBarService.success(currentUserInformation?.name + ', has deleted successfully');
          this.getAllUserInformation();
        } else {
          this._snackBarService.success('Error while deleting the records');
        }
      }, error => {
        this._snackBarService.error(error?.error?.errors);
      });
    }
  }

  editUser(currentUserInformation: IUserInterface): void {
    if (currentUserInformation?._id) {
      this._route.navigate(['/user/edit-user/', currentUserInformation?._id]);
    }
  }

  addMoreProduct(): void {
    this._route.navigate(['/user/product-list']);
  }

  myProducts(currentUserInformation: IUserInterface): void {
    this._route.navigate(['/user/product-list', currentUserInformation?._id]);
  }

}
