import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

export interface AuthResponseData {
  name: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.googleapisApiKey,
      {
        name,
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => resData)
    );
  }

  autoLogin() {
    const userData: {
      name: string,
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string

    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.name,
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.googleapisApiKey,
      {
        name,
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(resData => resData)
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData'); // clear local storage on logout
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleAuthentification(
    name: string,
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const experationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      name,
      email,
      userId,
      token,
      experationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.error(errorResponse);
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
    }

    return throwError(errorMessage);
  }
}
