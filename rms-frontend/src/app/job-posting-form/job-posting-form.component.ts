import { Component, inject } from '@angular/core';
import { Validators, NonNullableFormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IJobPosting, JobPostingStatus } from '../domain/job-posting';
import { Department } from '../domain';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { requireNotBlank } from '../validators/JobPostingValidator';
import { JobPostingServiceService } from '../service/job-posting.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-job-posting-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './job-posting-form.component.html',
  styleUrl: './job-posting-form.component.css'
})
export class JobPostingFormComponent {
  private jobPostingService = inject(JobPostingServiceService);
  private localStorageService = inject(LocalStorageService);
  jobPostingForm: FormGroup;
  departments = Object.values(Department);
  constructor(private _fb: NonNullableFormBuilder) {
    this.jobPostingForm = this._fb.group({
      title: ['', requireNotBlank()],
      description: ['', requireNotBlank()],
      department: this._fb.control<Department | null>(null, {
        validators: [Validators.required],
      }),
      status: this._fb.control<JobPostingStatus>(JobPostingStatus.DRAFT)
    });
  }

  create() {
    const jobPosting: IJobPosting = { ...this.jobPostingForm.value, status: JobPostingStatus.DRAFT };
    console.log(jobPosting);
    this.jobPostingService.sendJobPosting(jobPosting).subscribe(data => console.log(data));
  }



}