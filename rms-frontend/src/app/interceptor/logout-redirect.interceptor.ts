import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { NavService } from "../service/nav.service";
import { LoginService } from "../service/login.service";


@Injectable()
export class LogoutRedirectInterceptor implements HttpInterceptor {
    constructor(private readonly router: Router,private readonly loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status == 401) {
                    this.loginService.logout();
                    this.router.navigate([NavService.ROUTE_LOGIN]);
                }
                return throwError(() => error);
            })
        )
    }
}