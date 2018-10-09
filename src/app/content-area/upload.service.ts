import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _http: HttpClient) { }
  submitFile(data) {
    return this._http.post('http://localhost:52060/api/fileUpload', data).pipe(
      tap(response => response),
      catchError(this.handleError('failedupoload', []))
    );

  }

  async getBase64(file: any, name: string) {
    const currentFile = file.File;
    let result: string | any = '';
    const reader = new FileReader();
    reader.readAsDataURL(file.File);
    reader.onload = () => {
      try {
        result = reader.result;
        result = result.substring(result.indexOf('base64,') + 7);
        const resp = this._http.post('http://localhost:3000/api', {
            Base64String: result,
            FileName: name.split('\\').pop(),
            FarmId: '',
            FieldId: '',
            DrawingId: '',
          }).pipe(
            tap(response => response),
            catchError(this.handleError('failedupoload', []))
          );
        return resp;
      }
      finally {

      }
    };
    reader.onloadstart = () => { };
    reader.onerror = (error) => { };
    reader.onloadend = (object) => { };
    reader.onprogress = (e) => {
    };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
