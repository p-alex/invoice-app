export type DefaultResponse<TResult> = {
  success: boolean;
  message: string;
  result: TResult;
  error: string;
};
