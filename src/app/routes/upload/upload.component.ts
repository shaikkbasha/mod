import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from '../../../environments/environment';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  displayedColumns: string[] = ['fileName', 'fileSize', 'fileProgress', 'fileStatus', 'fileReady'];
  responseStr: any = {};
  dataSource: any = [];
  uploader: FileUploader;
  isLoading = false;
  token: any;
  tokenString: string;
  authTokenValue: string;
  hasBaseDropZoneOver: boolean;
  @ViewChild('uploaderInput') uploaderinput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;
  hasAnotherDropZoneOver: boolean;
  uploaderOptions: any = {};
  navigationSubscription;
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'upload',
    enableSearch: false,
    id: 'btn-upload',
    enableCreate: false,
    uploadButtonList: [
      {
        label: 'Delete All',
        icon: 'fa fa-trash',
        id: 'btn-upload-delete',
        eventName: 'delete'
      },
      {
        label: 'Cancel All',
        icon: 'fa fa-times',
        id: 'btn-upload-cancel',
        eventName: 'cancel'
      },
      {
        label: 'Upload All',
        icon: 'fa fa-cloud-upload',
        id: 'btn-upload-uploadall',
        eventName: 'upload'
      },
      {
        label: 'Choose Files',
        icon: 'fa fa-file-archive-o',
        id: 'btn-upload-choosefiles',
        eventName: 'choosefiles'
      }
    ]
  };


  constructor(private route: ActivatedRoute, private router: Router,
    private oktaAuth: OktaAuthService, private changeDetector: ChangeDetectorRef) {
    const API = `${environment.INGESTION_API}`;
    const URL = API + '/api/v1/upload';
    this.authTokenValue = '';
    this.tokenString = '';
    this.token = '';

    this.getToken();
    this.authTokenValue = 'Bearer' + this.token;
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: false,
      autoUpload: false,
      isHTML5: true,
      authToken: this.authTokenValue

    });
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      fileItem.progress = progress;
      this.onSearchChange(fileItem);
      this.changeDetector.detectChanges();
    };
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.onSearchChange('');
  }
  public getToken() {
    this.oktaAuth.getAccessToken().then(data => {
      this.token = data;
      const authTokenValue = 'Bearer ' + this.token;
      this.uploader.authToken = authTokenValue;
    });
  }
  ngOnInit() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const error = JSON.parse(response);
      this.responseStr = error.message;
      this.onSearchChange('');
    };

    this.uploader.onBeforeUploadItem = (item: any) => {
      this.onSearchChange('');
    };
  }

  onSearchChange(item) {
    const obj = [];
    this.uploader.queue.forEach((fileObj, i) => {
      let status = '';
      const action = false;
      if (fileObj.isSuccess) {
        status = 'Success';
      }
      if (fileObj.isCancel) {
        status = 'Cancel';
      }
      if (fileObj.isUploading) {
        status = 'Uploading';
      }
      if (fileObj.isError) {
        status = 'Error';
      }
      if (item === '' || (item !== '' && item !== fileObj._file.name)) {
        obj.push({
          fileName: fileObj._file.name,
          fileSize: fileObj._file.size,
          fileProgress: fileObj.progress,
          fileStatus: status,
          fileReady: action,
          fileEvents: fileObj

        });

      }
    });
    this.dataSource = obj;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getEvent(params) {
    if (params.moduleName === 'upload') {
      if (params.eventName === 'upload') {
        this.uploader.uploadAll();
        this.onSearchChange('');
      } else if (params.eventName === 'cancel') {
        this.uploader.cancelAll();
      } else if (params.eventName === 'delete') {
        this.uploader.clearQueue();
        this.dataSource = [];
      } else {
        const el: HTMLElement = this.uploaderinput.nativeElement as HTMLElement;
        el.click();
      }
    }
  }
  clearData(item) {
    this.onSearchChange(item);
  }

}
