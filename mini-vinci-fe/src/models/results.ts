export interface ProblemResult {
  problemId: number
  problemName: string
  submissionCount: number;
  minCost: number;
  lastSubmittedAt: Date;
}
export const problemResultFromResponse = (
  response: any,
): ProblemResult => ({
  problemId: response.problem_id,
  problemName: response.problem_name,
  submissionCount: response.submission_count,
  minCost: response.min_cost,
  lastSubmittedAt: new Date(response.last_submitted_at),
});

export interface UserResult {
  totalCost: number;
  solvedProblemCount: number;
  results: ProblemResult[];
}
export const userResultFromResponse = (response: any): UserResult => ({
  totalCost: response.total_cost,
  solvedProblemCount: response.solved_problem_count,
  results: response.results.map((problemResult: any) =>
    problemResultFromResponse(problemResult),
  ),
});
