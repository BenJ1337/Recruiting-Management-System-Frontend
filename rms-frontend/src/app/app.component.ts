import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    MatSidenavModule,
    MatListModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    CommonModule
  ]
})
export class AppComponent implements OnInit{
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  links: NavLink[] = [{text: 'Login', route: 'login'}];

constructor(private readonly router: Router) {
  if(this.localStorageService.hasItem(LocalStorageService.JWT)) {
    this.links =[
      {text: 'List job postings', route: 'job-posting-list'},
      {text: 'Create job posting', route: 'job-posting-form'},
      {text: 'Login', route: 'login'}];
  }
}
  ngOnInit(): void {
    if(!this.localStorageService.hasItem(LocalStorageService.JWT)) {
      this.router.navigate(['/login']);
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
interface NavLink {
  route: string,
  text: string
}