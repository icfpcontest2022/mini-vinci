export interface SupportHistory {
  time: Date;
  message: string;
  isAnswer: boolean;
}

export const supportHistoryFromResponse = (response: any): SupportHistory => ({
  time: new Date(response.time),
  message: response.message,
  isAnswer: response.is_answer,
});
