import { Role } from "./role";

export interface UserBase {
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
  createdAt: string;
  location: string;
}

export interface User extends UserBase {
  id: string;
  isDisabled: boolean;
  role: Role;
  profileImage: string;
}

export interface UserRequest extends UserBase {}
