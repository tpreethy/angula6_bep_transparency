import { UploadService } from './upload.service';
import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import { FileObjectModel, UploadFileMode } from './file-object-model';
// const URL = '/api/';
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

const URL =  'http://localhost:3000/api';

@Component({selector: 'app-content-area', templateUrl: './content-area.component.html', styleUrls: ['./content-area.component.css']})
export class ContentAreaComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL, isHTML5: true});
  public hasBaseDropZoneOver = false;
  public filesListModel: Array<UploadFileMode> = [];
  public reportType: string[] = ['report1', 'report2', 'report3', 'report4'];
  constructor(private _uploadService: UploadService) {}

  ngOnInit() {}

  public fileOver(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileDrop(event: any): void {
    this.filePicked(event);
  }

//   filePicked(oEvent) {
//     // Get The File From The Input
//     const target: any = <DataTransfer>(oEvent);
//     // tslint:disable-next-line:curly
//     if (target.length !== 1) throw new Error('Cannot use multiple files');
//     if (target.length > 0 && (!this.isValidFiles(target))) {
//       return false;
//     }
//     const reader: FileReader = new FileReader();
//     const rABS = !!reader.readAsBinaryString;
//     reader.onload = (e: any) => {
//       /* read workbook */
//       let bstr: any = e.target.result;
//       if (!rABS) { bstr = new Uint8Array(bstr); }
//       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
//       /* grab first sheet */
//       const wsname: string = wb.SheetNames[0];
//       const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//       console.log(XLSX.utils.sheet_to_json(ws));
//       const data = XLSX.utils.sheet_to_json(<FileObjectModel>ws, {raw: true});
//       console.log(JSON.stringify(data));
//       // tslint:disable-next-line:max-line-length
//       const rowModel: UploadFileMode = { name: oEvent[0].name , size: oEvent[0].size, data: data, status: 'success', reportType: 'report1' };
//       this.filesListModel.push(rowModel);
//     };
//     if (rABS) { reader.readAsBinaryString(target[0]); } else { reader.readAsArrayBuffer(target[0]); }
// }

  filePicked(oEvent) {
    // Get The File From The Input
    const target: any = <DataTransfer>(oEvent);
    // tslint:disable-next-line:curly
    if (target.length !== 1) throw new Error('Cannot use multiple files');
    if (target.length > 0 && (!this.isValidFiles(target))) {
      return false;
    }
    const reader: FileReader = new FileReader();
    // need to comment Read as URL
    reader.readAsDataURL(target[0]);
    // need to comment RABS
    // const rABS = !!reader.readAsBinaryString;
    reader.onload = (e: any) => {
      /* read workbook */
      let bstr: any = e.target.result;
      // need to comment RABS
      // if (!rABS) { bstr = new Uint8Array(bstr); }
      bstr = bstr.substring(bstr.indexOf('base64,') + 7);
      // tslint:disable-next-line:max-line-length
      const rowModel: UploadFileMode = { name: oEvent[0].name , size: oEvent[0].size, file: bstr, status: 'success', reportType: 'report1' };
      this.filesListModel.push(rowModel);
    };
    // need to comment RABS
    // if (rABS) { reader.readAsBinaryString(target[0]); } else { reader.readAsArrayBuffer(target[0]); }
}
private isValidFiles(files) {
  // Check Number of files
  const formatTypes = ['.xls', '.xlsx', '.csv'];
  const matchType = formatTypes.find(function (obj) { return files[0].name.indexOf(obj) > 0; });
  if (files.length > 0 && !matchType) {
    alert('uploaded only .xls, .xlsx, .csv file types ');
    return false;
  }
  return true;
}

  uploadfile(rowObject: UploadFileMode) {
     console.log('rowObject', rowObject);
     const inputObject = {file: rowObject.file, reportType: rowObject.reportType};
     this._uploadService.submitFile(inputObject).subscribe((response) => {
        console.log('response', response);
     });

  }
  importFiles(event) {
    console.log('event', event.target.files);
    this.filePicked(event.target.files);
  }
  selectReportType(value: string) {
    // this.reportType = value;
  }
}
