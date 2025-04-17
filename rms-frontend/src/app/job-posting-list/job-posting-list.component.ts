import { Component, inject } from '@angular/core';
import { JobPostingServiceService } from '../service/job-posting-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IJobPosting } from '../domain/job_posting';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-job-posting-list',
  templateUrl: './job-posting-list.component.html',
  styleUrl: './job-posting-list.component.css',
  imports: [MatTableModule, AsyncPipe, CommonModule]
})
export class JobPostingListComponent {
  private jobPostingService = inject(JobPostingServiceService);

  columnsDisplay: string[] = ['title', 'description'];
  dataSource: MatTableDataSource<IJobPosting> = new MatTableDataSource<IJobPosting>();

  constructor() {
    this.jobPostingService.getJobPostings().subscribe(jobpostings => {
      this.dataSource.data = jobpostings;
    });
  }

}
