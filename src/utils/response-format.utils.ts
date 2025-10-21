import { ApiResponse } from "./common-interface.utils.js";

export const GenResponseFormat = <T = any>(
  code: number,
  success: boolean,
  message: string,
  data: T | null = null
): ApiResponse<T> => ({
  code,
  data: {
    success,
    message,
    data,
  },
});
