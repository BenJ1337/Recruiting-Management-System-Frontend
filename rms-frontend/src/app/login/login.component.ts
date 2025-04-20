import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { requireNotBlank } from '../validators/JobPostingValidator';
import { User } from '../domain/user';
import { LoginService } from '../service/login.service';
import { AccessToken } from '../domain/auth/access-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService, LocalStorageService]
})
export class LoginComponent {
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly loginService: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);
  loginForm: FormGroup<UserFormGroup>;
  constructor(private readonly _fb: NonNullableFormBuilder) {
    this.loginForm = this._fb.group<UserFormGroup>({
      username: this._fb.control('', {validators: [requireNotBlank()]}),
      password: this._fb.control('', {validators: [requireNotBlank()]})
    });
  }

  login() {
    const user: User = this.loginForm.getRawValue();
    this.loginService.sendLoginRequest(user).subscribe(token => {
      this.localStorageService.setItem(LocalStorageService.JWT, token);
      this.router.navigate(['job-posting-list'])
    });
    console.info(user);
  }
}

type UserFormGroup = { [K in keyof User]: FormControl<User[K]> };