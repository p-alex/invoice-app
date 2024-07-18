export type DefaultResponse<TResult> = {
  success: boolean;
  result: TResult;
  error: string;
};
