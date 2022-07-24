import { SubmissionStatus } from '../variables/submission';

export const formatSubmissionStatus = (status: SubmissionStatus): string =>
  status[0] + status.slice(1).toLowerCase();
