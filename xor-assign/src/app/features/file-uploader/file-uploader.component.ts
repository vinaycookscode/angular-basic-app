import { SharedService } from '../../shared/services/shared.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef<any> = null;

  @Input() mode = null;
  @Input() names = null;
  @Input() url = null;
  @Input() method = null;
  @Input() multiple = false;
  @Input() disabled = null;
  @Input() accept = null;
  @Input() maxFileSize = null;
  @Input() auto = true;
  @Input() withCredentials = null;
  @Input() invalidFileSizeMessageSummary = null;
  @Input() invalidFileSizeMessageDetail = null;
  @Input() invalidFileTypeMessageSummary = null;
  @Input() invalidFileTypeMessageDetail = null;
  @Input() previewWidth = null;
  @Input() chooseLabel = 'Choose'
  @Input() uploadLabel = 'Upload';
  @Input() cancelLabel = 'Cance';
  @Input() customUpload = null;
  @Input() showUploadButton = null;
  @Input() showCancelButton = null;
  @Input() dataUriPrefix = null;
  @Input() deleteButtonLabel = null;
  @Input() deleteButtonIcon = 'close';
  @Input() showUploadInfo = null;
  files: File[] = [];
  inputFileName: string;
  constructor(
    private sanitizer: DomSanitizer,
    private sharedService: SharedService
  ) {

  }

  ngOnInit(): void {
  }

  onClick(event: any) {
    this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: any) {
    const reader = new FileReader();
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    this.files = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      reader.readAsDataURL(file);
      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        reader.onload = () => {
          file.imageSrc = reader.result as string;
        };
        reader.onloadend = () => {

        };
        if (!this.isMultiple()) {
          this.files = []
        }
        this.files.push(files[i]);
      }
    }
    this.sharedService?.uploadedFile?.next(this.files);
  }

  removeFile(currentFile: File) {
    this.sharedService?.uploadedFile?.subscribe( (allFile: File[]) => {
      this.files = allFile.filter( (eachFile: File)=> {
        return eachFile?.name !== currentFile?.name;
      });
    });

    this.sharedService?.uploadedFile?.next(this.files);
    this.clearInputElement();
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }

  onInput(event) {

  }
}
