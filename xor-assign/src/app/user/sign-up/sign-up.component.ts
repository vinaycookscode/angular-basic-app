import { IApiResponseInterface } from 'src/app/shared/interfaces/api.response.interface';
import { UserService } from './../user.service';
import { ReactiveFormGroup } from './../../shared/reactive.forms';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { COUNTRIES, DEFAULT_PROFILE_PIC, FORM_NAME_ENUM, GENDER_TYPES } from 'src/app/shared/global.constants';
import { IUserInterface } from '../interfaces/signup.interface';
import { SnakBarService } from 'src/app/shared/services/snak.bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;
  COUNTRIES = COUNTRIES;
  DEFAULT_PROFILE_PIC = DEFAULT_PROFILE_PIC;
  signupFormGroup: FormGroup;
  GENDER_TYPES = GENDER_TYPES;
  userId = null;
  userInformation: IUserInterface;
  constructor(
    private _sharedService: SharedService,
    private _userService: UserService,
    private _snackBar: SnakBarService,
    private _router: Router
  ) {
    this.signupFormGroup = ReactiveFormGroup.getFormGroup(FORM_NAME_ENUM.SIGNUP_FORM);
  }

  setEditFormValues(userInformation: IUserInterface): void {
    this.signupFormGroup.patchValue({
      name: userInformation?.name,
      gender: userInformation?.gender,
      email: userInformation?.email,
      address: userInformation?.address,
      city: userInformation?.city,
      state: userInformation?.state,
      photo: userInformation?.photo,
      password: userInformation?.password,
      isActive: userInformation?.isActive,
      hobby: userInformation?.hobby,
    });
  }

  ngOnInit(): void {
    const reader = new FileReader();
    this._sharedService?.uploadedFile?.subscribe( (uploadedFile: any) => {
      if (uploadedFile && uploadedFile.length) {
        reader.readAsDataURL(uploadedFile[0]);
        reader.onload = () => {
           this.DEFAULT_PROFILE_PIC = reader.result as string;
        };
        reader.onloadend = () => {

        };
      } else {
        this.DEFAULT_PROFILE_PIC = DEFAULT_PROFILE_PIC;
      }
    });
  }

  signup(): boolean {
    if (this.signupFormGroup.invalid) {
      return false;
    } else {
      const allValues: IUserInterface = this.signupFormGroup.value;
      this._userService?.signupToSystem(allValues).subscribe( (signupApiResponse: IApiResponseInterface) => {
        if (signupApiResponse?.status) {
          this._snackBar.success('User has signup successfuly');
          this._router.navigate(['/']);
        } else {
          this._snackBar.error('Email or password are wrong');
        }
      }, (error: any) => {
        console.log(error);
        this._snackBar.error(error?.error?.errors[0]?.message);
      });
    }
    return true;
  }

  cancel(): void {
    this.signupFormGroup.reset();
  }

  get signupReactiveForm(): FormGroup {
    return this.signupFormGroup;
  }

}
