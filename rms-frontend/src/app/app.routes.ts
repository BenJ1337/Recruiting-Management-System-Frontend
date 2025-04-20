import { Routes } from '@angular/router';
import { JobPostingListComponent } from './job-posting-list/job-posting-list.component';
import { JobPostingFormComponent } from './job-posting-form/job-posting-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'job-posting-list', component: JobPostingListComponent },
    { path: 'job-posting-form', component: JobPostingFormComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: JobPostingListComponent },
    { path: '**', redirectTo: '' }
];
