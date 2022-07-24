import { Submission } from '../models/submission';
import { SubmissionStatus } from '../variables/submission';

export const mockSubmissions: Submission[] = [
  {
    submissionNumber: 1,
    date: new Date(),
    id: '123456',
    status: SubmissionStatus.FAILED,
    score: 0,
  },
  {
    submissionNumber: 2,
    date: new Date(),
    id: '140123',
    status: SubmissionStatus.QUEUED,
  },
  {
    submissionNumber: 3,
    date: new Date(),
    id: '999999',
    status: SubmissionStatus.PROCESSING,
  },
  {
    submissionNumber: 4,
    date: new Date(),
    id: '141414',
    status: SubmissionStatus.SUCCEEDED,
    score: 80,
  },
];
