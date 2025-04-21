import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './service/login.service';
import { NavService } from './service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    CommonModule
  ]
})
export class AppComponent implements OnInit{
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  readonly loginService: LoginService = inject(LoginService);
  readonly navService: NavService = inject(NavService);

constructor(private readonly router: Router) {}
  ngOnInit(): void {
    if(!this.localStorageService.hasItem(LocalStorageService.JWT)) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}