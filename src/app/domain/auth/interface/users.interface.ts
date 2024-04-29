export interface UsersResponse {
  id: number;
  name: string;
  userName: string;
  email: string;
  password: string;
}
export interface UsersRequestSingUp {
  name: string;
  userName: string;
  email: string;
  password: string;
}
export interface UsersRequestSingIn {
  name: string;
  password: string;
}
