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

export interface Note {
  id: string;
  content: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
