import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
  declarations: [
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    FileUploaderComponent
  ]
})
export class FileUploaderModule { }
