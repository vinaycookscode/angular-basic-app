import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FORM_NAME_ENUM } from "./global.constants";
export class ReactiveFormCustomValidators {
  static emailValidator(abstractControl: AbstractControl) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return { isValidEmail: re.test(String(abstractControl?.value).toLowerCase())};
  }
}

export class ReactiveFormGroup {
  private static formBuilder: FormBuilder = new FormBuilder();
  private static FORMS_MAPPING =  {
    [FORM_NAME_ENUM.LOGIN_FORM] : ReactiveFormGroup.loginFormGroup(),
    [FORM_NAME_ENUM.SIGNUP_FORM] : ReactiveFormGroup.signupFormGroup(),
    [FORM_NAME_ENUM.USER_FORM] : ReactiveFormGroup.userInformation()
  };

  static getFormGroup(formName: FORM_NAME_ENUM): FormGroup {
    return this.FORMS_MAPPING[formName];
  }

  static loginFormGroup(): FormGroup {
    return this.formBuilder.group( {
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  static signupFormGroup(): FormGroup {
    return this.formBuilder.group( {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      gender: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        // ReactiveFormCustomValidators.emailValidator
      ]),
      address: new FormControl(null, [
        Validators.required
      ]),
      city: new FormControl(null, [
        Validators.required
      ]),
      state: new FormControl(null, [
        Validators.required
      ]),
      country: new FormControl(null, [
        Validators.required
      ]),
      photo: new FormControl(null, [
        // Validators.required
      ]),
      hobby: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      isActive: new FormControl(null, [
      ])
    });
  }

  static userInformation(): FormGroup {
    return this.formBuilder.group( {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      gender: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
      ]),
      address: new FormControl(null, [
        Validators.required
      ]),
      city: new FormControl(null, [
        Validators.required
      ]),
      state: new FormControl(null, [
        Validators.required
      ]),
      country: new FormControl(null, [
        Validators.required
      ]),
      hobby: new FormControl(null, [
        Validators.required
      ]),
      isActive: new FormControl(null, [
      ])
    });
  }
}
