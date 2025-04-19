import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IJobPosting, JobPostingStatus } from '../domain/job_posting';
import { Department } from '../domain';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-job-posting-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './job-posting-form.component.html',
  styleUrl: './job-posting-form.component.css'
})
export class JobPostingFormComponent {
  jobPostingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobPostingForm = this.fb.group<IJobPosting>({
      title: '',
      description: '',
      department: Department.DEPARTMENT1,
      status: JobPostingStatus.DRAFT,
    });
  }

  submit() {
    console.log(this.jobPostingForm.value);
  }

}