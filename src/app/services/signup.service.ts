import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, ignoreElements, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { iSignupSuccessfulResponse } from '../interfaces/isignup-successful-response';
import { iUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _authToken: string | null

  constructor(
    private http: HttpClient 
  ) {
    this._authToken = null
  }

  login(userCredentials: iUser):Observable<iSignupSuccessfulResponse>{

    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${environment.BASE_URL}/auth.json`
    const body = userCredentials

    // return this.http.post<iSignupSuccessfulResponse>(url, body, {headers})
      // .pipe(
      //   catchError(this.handleError)
      // )

    return this.http
      .post<iSignupSuccessfulResponse>(url, body, {headers})
      .pipe(
        tap(({name}) => this.handleSuccessfulLogin(name)) 
      )
  }

  private handleSuccessfulLogin = (token: string) => {
    this._authToken = token
  }
}
