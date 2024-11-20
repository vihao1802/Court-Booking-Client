import { UpdateUserRequest, User } from "@/models/user"
import dayjs from "dayjs"

export const ToUpdateUser = (user: User | null | undefined ): UpdateUserRequest | null |undefined => {
  if (!user) {
    return null
  }
  return { 
    userName: user.userName,
    phoneNumber: user.phoneNumber,
    dayOfBirth: dayjs(user.dayOfBirth).format('YYYY-MM-DD'),
    location: user.location,
    gender : user.gender
  }
}
