import { Component, inject } from '@angular/core';
import { JobPostingServiceService } from '../service/job-posting.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IJobPosting } from '../domain/job-posting';
import { MatSnackBar, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-job-posting-list',
  templateUrl: './job-posting-list.component.html',
  styleUrl: './job-posting-list.component.css',
  imports: [MatTableModule, AsyncPipe, CommonModule, MatSnackBarModule]
})
export class JobPostingListComponent {
  private jobPostingService = inject(JobPostingServiceService);
  private snackbar = inject(MatSnackBar);
  private localStorage = inject(LocalStorageService);

  columnsDisplay: string[] = ['title', 'description'];
  dataSource: MatTableDataSource<IJobPosting> = new MatTableDataSource<IJobPosting>();

  constructor() {
    this.jobPostingService.getJobPostings().subscribe(jobpostings => {
      this.dataSource.data = jobpostings;
    });
    this.snackbar.open('Hello World', '', { duration: 1000, verticalPosition: 'top' });
  }

}
