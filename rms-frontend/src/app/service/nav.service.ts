import { computed, inject, Injectable, Signal, signal } from "@angular/core"
import { LoginService } from "./login.service";

interface NavLink {
  route: string,
  text: string
}

@Injectable({providedIn: 'root'})
export class NavService {
  static readonly ROUTE_LOGIN = 'login';
  static readonly ROUTE_JOB_LISTINGS = 'job-listings';
  static readonly ROUTE_JOB_FORM = 'job-form';

  readonly loginService: LoginService = inject(LoginService);

    navlist: Signal<NavLink[]> = computed(() => 
      this.loginService.loginState() ? 
        [{text: 'List job postings', route: NavService.ROUTE_JOB_LISTINGS}, {text: 'Create job posting', route: NavService.ROUTE_JOB_FORM},] 
      : [{text: 'Login', route: NavService.ROUTE_LOGIN}]);
}