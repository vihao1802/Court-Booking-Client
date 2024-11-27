import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { User } from "@/models/user";
import React, { createContext, useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho Context
interface UserContextType {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [error, setError] = useState(false);

  const [userData, setUserData] = useState<User>({
    id: "",
    userName: "",
    email: "",
    phoneNumber: "",
    dayOfBirth: "",
    createdAt: "",
    location: "",
    profileImage: "",
    gender: true,
    isDisabled: false,
    role: {
      id: "",
      roleName: "",
    },
    changedPassword: false,
  });
  const { user } = useAuthenticatedUser();
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  // useEffect(() => {
  //   console.log("error context", error);
  // }, [error]);
  return (
    <UserContext.Provider value={{ userData, setUserData, error, setError }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
