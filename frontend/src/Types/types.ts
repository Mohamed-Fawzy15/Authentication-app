export interface loginInterface {
  email: string;
  password: string;
}

export interface signUpInterface {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface UserResponse {
  status?: number;
  message?: string;
  data?: {
    id: string;
    name: string;
    email: string;
  };
}
