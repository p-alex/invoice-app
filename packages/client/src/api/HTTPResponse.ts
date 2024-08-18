import { DefaultResponse } from "../entities/DefaultResponse";

class HTTPResponse {
  static success<TResult>(result: TResult): DefaultResponse<TResult> {
    return { success: true, result, error: "" };
  }

  static error(message: string): DefaultResponse<null> {
    return { success: false, result: null, error: message };
  }
}

export default HTTPResponse;
