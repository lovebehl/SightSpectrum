export interface ILoginRequestState {
  type: String;
  username: string;
  password: string;
  age: string;
}

interface IResponse {
  id: number;
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
}
