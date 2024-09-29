import { DefaultResponse } from "../entities/DefaultResponse";

class HTTPResponse {
  static success<TResult>(message: string, result: TResult): DefaultResponse<TResult> {
    return { success: true, result, message, error: "" };
  }

  static error(errorMessage: string): DefaultResponse<null> {
    return { success: false, result: null, message: "", error: errorMessage };
  }
}

export default HTTPResponse;
