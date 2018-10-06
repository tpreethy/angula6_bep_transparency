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
    return this._http.post('http://localhost:3000/api', data).pipe(
      tap(response => response),
      catchError(this.handleError('failedupoload', []))
    );

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
