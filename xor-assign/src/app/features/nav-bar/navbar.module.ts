import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { NavBarComponent } from './nav-bar.component';


@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
