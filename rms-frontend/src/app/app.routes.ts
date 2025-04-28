import { Routes } from '@angular/router';
import { JobPostingListComponent } from './job-posting-list/job-posting-list.component';
import { JobPostingFormComponent } from './job-posting-form/job-posting-form.component';
import { LoginComponent } from './login/login.component';
import { NavService } from './service/nav.service';

export const routes: Routes = [
    { path: NavService.ROUTE_JOB_LISTINGS, component: JobPostingListComponent },
    { path: NavService.ROUTE_JOB_FORM, component: JobPostingFormComponent },
    { path: NavService.ROUTE_LOGIN, component: LoginComponent },
    { path: '', component: JobPostingListComponent },
    { path: '**', redirectTo: '' }
];
