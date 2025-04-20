import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobPosting } from '../domain/job-posting';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class JobPostingServiceService {
  private http:HttpClient = inject(HttpClient);
  private localStorage:LocalStorageService = inject(LocalStorageService);

  public getJobPostings(): Observable<IJobPosting[]> {
    return this.http.get<IJobPosting[]>('/api/v1/jobpostings');
  }

  public sendJobPosting(jobPosting: IJobPosting): Observable<IJobPosting> {
    return this.http.put<any>('/api/v1/jobpostings/3', jobPosting);
  }
}
