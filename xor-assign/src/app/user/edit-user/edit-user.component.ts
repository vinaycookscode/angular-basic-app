import { SharedService } from './../../shared/services/shared.service';
import { ICountry, IUserInterface } from './../interfaces/signup.interface';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormGroup } from 'src/app/shared/reactive.forms';
import { COUNTRIES, FORM_NAME_ENUM, GENDER_TYPES } from 'src/app/shared/global.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponseInterface } from 'src/app/shared/interfaces/api.response.interface';
import { UserService } from '../user.service';
import { SnakBarService } from 'src/app/shared/services/snak.bar.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userFormGroup: FormGroup;
  userId: string = null;
  userInformation: IUserInterface;
  GENDER_TYPES = GENDER_TYPES;
  COUNTRIES = COUNTRIES;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _snackBar: SnakBarService,
    private _router: Router,
    private _sharedService: SharedService
  ) {
    this.userFormGroup = ReactiveFormGroup.getFormGroup(FORM_NAME_ENUM.USER_FORM);
    this._activatedRoute.params?.subscribe((parameterObject) => {
      this.userId = parameterObject?.id ? parameterObject?.id : null;
    });
  }

  setEditFormValues(userInformation: IUserInterface): void {
    console.log('user information to edit', userInformation);
    this.userFormGroup.patchValue({
      name: userInformation?.name,
      gender: userInformation?.gender,
      // email: userInformation?.email,
      address: userInformation?.address,
      city: userInformation?.city,
      state: userInformation?.state,
      country: userInformation?.country,
      // photo: userInformation?.photo,
      // password: userInformation?.password,
      isActive: userInformation?.isActive,
      hobby: userInformation?.hobby,
    });
  }

  compareCountryObject(countryObject1: ICountry, countryObject2: ICountry): boolean {
    return countryObject1 && countryObject2 && countryObject1?.id === countryObject2?.id;
  }

  editUser(): void {
    const userInformation: IUserInterface = this.userFormGroup?.value;
    userInformation._id = this.userId;
    this._userService?.editUser(userInformation).subscribe( (userApiResponse: IApiResponseInterface) => {
      if (userApiResponse?.status) {
        this._snackBar.success('User information updated successfully');
        this._router?.navigate(['/user/user-list']);
      } else {
        this._snackBar.error('Something went wrong');
      }
    }, (error: any) => {
      this._snackBar.error(error?.error?.errors[0]?.message ? error?.error?.errors[0]?.message : error?.error?.msg);
    });
  }

  ngOnInit(): void {
    if (this.userId && this._sharedService?.autorizationToken?.value) {
      this._userService.getUserInformationById(this.userId).subscribe( (apiResponse: IApiResponseInterface) => {
        if (apiResponse?.status) {
          this.userInformation = apiResponse?.data;
          this.setEditFormValues(this.userInformation[0]);
        } else {
          this._snackBar.error('Something went wrong.');
        }
      }, (error: any) => {
        this._snackBar.error(error?.error?.errors[0]?.message ? error?.error?.errors[0]?.message : error?.error?.msg);
        this._router.navigate(['/']);
      });
    } else {
      this._snackBar.error('No authorization token found');
      this._router.navigate(['/']);
    }
  }

  cancel(): void {
    this.userFormGroup.reset();
    this._router.navigate(['/user/user-list']);
  }

  get signupReactiveForm(): FormGroup {
    return this.userFormGroup;
  }
}
