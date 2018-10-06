export interface FileObjectModel {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Age: number;

}

export interface UploadFileMode {
    name: string;
    size: number;
    status: string;
    data: Array<any>;
    reportType: string;
}
