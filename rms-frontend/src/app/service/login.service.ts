import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../domain/user";
import { AccessToken } from "../domain/auth/access-token";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginService {
  private http = inject(HttpClient);

  public sendLoginRequest(user: User): Observable<AccessToken> {
    return this.http.post<AccessToken>('/auth/v1/login', user);
  }

  public static getHeader(token: string) {
    return new HttpHeaders({Authorization: `Bearer ${token}`})
  }

}