export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
  createdAt: string;
  location: string;
}

export interface CreateUser {
  userName: string;
  email: string;
  phoneNumber: string;
  dayOfBirth: string;
  password: string;
}
