export interface UserBase {
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
  createdAt: string;
  location: string;
  profileImage: string;
}

export interface User extends UserBase {
  id: string;
}

export interface UserRequest extends UserBase {}
