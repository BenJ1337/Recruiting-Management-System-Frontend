import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../domain/user";
import { AccessToken } from "../domain/auth/access-token";
import { firstValueFrom, Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({providedIn: 'root'})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  public loginState = signal(false);

  public async sendLoginRequest(user: User): Promise<void> {
      const token = await firstValueFrom(this.http.post<AccessToken>('/auth/v1/login', user));
      this.localStorageService.setItem(LocalStorageService.JWT, token);
      this.loginState.set(true);
  }

  public logout():void {
    this.localStorageService.removeItem(LocalStorageService.JWT);
    this.loginState.set(false);
  }

  public static getHeader(token: string) {
    return new HttpHeaders({Authorization: `Bearer ${token}`})
  }
}