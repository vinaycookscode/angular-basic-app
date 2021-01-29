import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavBarModule } from '../features/nav-bar/navbar.module';
import { CommonModule } from '@angular/common';
import { FileUploaderModule } from '../features/file-uploader/file-uploader.module';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListProductComponent } from './list-product/list-product.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    UserListComponent,
    EditUserComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatFormFieldModule,
    MaterialModule,
    NavBarModule,
    FileUploaderModule
  ],
  providers: [
  ]
})
export class UserModule { }
