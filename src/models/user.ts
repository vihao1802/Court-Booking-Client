export interface UserBase {
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
  createdAt: string;
  location: string;
  profileImage: string;
  gender:boolean
}

export interface User extends UserBase {
  id: string;
}

export interface UserRequest extends UserBase {}

export interface UpdateUserRequest {
  userName: string;
  phoneNumber: string;
  dayOfBirth: string;
  location: string;
  gender:boolean
}

export interface UpdateProfileImageRequest {
  profileImage: string;
}

export interface UpdatePasswordRequest {
  oldPassword:string;
  newPassword:string
}
