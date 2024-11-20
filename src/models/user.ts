export interface UserBase {
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
}

export interface User extends UserBase {
  id: string;
  createdAt: string;
  profileImage: string;
}

export interface UserRequest extends UserBase {
  password: string;
}
