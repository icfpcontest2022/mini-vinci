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

export const submissionFromResponse = (
  response: any,
  submissionNumber: number,
): Submission => ({
  submissionNumber,
  date: new Date(response.submitted_at),
  id: response.id.toString(),
  status: response.status,
  score: response.score,
});
