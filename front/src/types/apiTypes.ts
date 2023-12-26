export interface TodoType {
  id: number;
  date: string;
  todo: string;
  isFinished: boolean;
}

export interface UserType {
  token: string;
  name: string;
  profileImg: string;
}
