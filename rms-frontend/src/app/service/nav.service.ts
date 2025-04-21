import { computed, inject, Injectable, Signal, signal } from "@angular/core"
import { LoginService } from "./login.service";

interface NavLink {
  route: string,
  text: string
}

@Injectable({providedIn: 'root'})
export class NavService {
  readonly loginService: LoginService = inject(LoginService);
    navlist: Signal<NavLink[]> = computed(() => 
      this.loginService.loginState() ? 
        [{text: 'List job postings', route: 'job-posting-list'}, {text: 'Create job posting', route: 'job-posting-form'},] 
      : [{text: 'Login', route: 'login'}]);
}