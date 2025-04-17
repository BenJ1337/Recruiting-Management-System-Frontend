import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobPosting } from '../domain/job_posting';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobPostingServiceService {
  private http = inject(HttpClient);

  public getJobPostings(): Observable<IJobPosting[]> {
    return this.http.get<IJobPosting[]>('http://localhost/api/v1/jobpostings');
  }
}
