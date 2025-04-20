import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "../service/local-storage.service";
import { inject, Injectable } from "@angular/core";
import { AccessToken } from "../domain/auth/access-token";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  private readonly localStorage: LocalStorageService = inject(LocalStorageService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info(`Hello?`);

    const token: AccessToken | null = this.localStorage.getItem(LocalStorageService.JWT);
    console.info(`Token: ${JSON.stringify(token)}`);
    if(token !== null) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`
        }
      })
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}