export interface FileObjectModel {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Age: number;

}

export interface UploadFileMode {
    Name: string;
    Size: number;
    Status: string;
    File: Array<any>;
    ReportType: string;
}
