import { Department } from './department';

export type IJobPostingOrNull = IJobPosting | null;

export interface IJobPosting {
  id?: number,
  title: string,
  description: string,
  department: Department,
  status: JobPostingStatus,
  note?: string;
}

export enum JobPostingStatus {
  DRAFT = "Draft",
  QA = "QA",
  PUBLISHED = "Published",
  SCREENING_OF_APPLICATIONS = "Screening of Applications",
  INVITATION_SENT = "Invitations sent",
  ARCHIVED = "Archived"
}