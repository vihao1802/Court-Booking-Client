import { Role } from "./role";

export interface UserBase {
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
}

export interface User extends UserBase {
  id: string;
  isDisabled: boolean;
  role: Role;
  createdAt: string;
  profileImage: string;
  location: string;
  gender: boolean;
  changedPassword: boolean;
}

export interface UserRequest extends UserBase {
  password: string;
}
