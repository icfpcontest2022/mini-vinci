interface MakeSubmissionRequest {
  code: string;
}

export const newMakeSubmissionRequest = (
  code: string,
): MakeSubmissionRequest => ({
  code,
});
