import { SubmissionStatus } from '../variables/submission';

export interface Submission {
  submissionNumber: number;
  date: Date;
  id: string;
  status: SubmissionStatus;
  score?: number;
  code?: string;
  imageUrl?: string;
}
