import { SharedService } from './../../shared/services/shared.service';
import { IUserLogin } from './../interfaces/login.interface';
import { UserService } from './../user.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormGroup } from 'src/app/shared/reactive.forms';
import { FORM_NAME_ENUM } from 'src/app/shared/global.constants';
import { IApiResponseInterface } from 'src/app/shared/interfaces/api.response.interface';
import { SnakBarService } from 'src/app/shared/services/snak.bar.service';
import jwt_decode from 'jwt-decode';
import { IUserInterface } from '../interfaces/signup.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup: FormGroup;

  constructor(
    private _route: Router,
    private _userService: UserService,
    private _snackBar: SnakBarService,
    private _sharedService: SharedService
  ) {
    this.loginFormGroup = ReactiveFormGroup.getFormGroup(FORM_NAME_ENUM.LOGIN_FORM);
  }

  ngOnInit(): void {
  }

  redirectToSignupPage(): void {
    this._route.navigate(['/user/sign-up']);
  }

  loginToSystem(): boolean {
    if (this.loginFormGroup?.invalid) {
      return false;
    } else {
      const userInformation: IUserLogin = this.loginFormGroup?.value;
      this._userService.loginToSystem(userInformation).subscribe( (loginResponse: IApiResponseInterface) => {
        if (loginResponse?.status) {
          const decodedToken: IUserInterface = jwt_decode(loginResponse?.data);
          this._sharedService?.autorizationToken?.next(loginResponse?.data);
          this._sharedService?.userInformation?.next(decodedToken);
          this._route.navigate(['/user/user-list']);
        } else {
          this._snackBar.error('Email or password are wrong');
        }
      }, (error: any) => {
        this._snackBar.error(error?.error?.errors);
      });
    }
    return true;
  }

  cancel(): void {
    this.loginFormGroup?.reset();
  }

}
