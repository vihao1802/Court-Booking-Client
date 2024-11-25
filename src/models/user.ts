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
}

export interface UserRequest extends UserBase {
  password: string;
}

export interface UpdateUserRequest {
  userName: string;
  phoneNumber: string;
  dayOfBirth: string;
  location: string;
  gender: boolean;
}

export interface UpdateProfileImageRequest {
  profileImage: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
