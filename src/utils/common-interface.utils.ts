export type TTokenUser = {
  userId: string;
  role: string;
};

export type ApiResponse<T = any> = {
  code: number;
  data: {
    success: boolean;
    message: string;
    data: T | null;
  };
};


