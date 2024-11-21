import { UpdatePasswordRequest, UpdateUserRequest, User, UserRequest } from "@/models/user";
import axiosInstance from "./axios-instance";
import { headers } from "next/headers";

const prefix = "users";
export const userApi = {
    async updateUser(requestBody: UpdateUserRequest) {
        const res = await axiosInstance.put<User>(`${prefix}/update`, requestBody);
        return res.data;
    },

    async updateProfileImage(requestBody: FormData) {
        const res = await axiosInstance.put(`${prefix}/update/profile-image`, requestBody,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        );
        return res.data;
    },

    async updatePassword(requestBody: UpdatePasswordRequest) {
        const res = await axiosInstance.put(`${prefix}/update/password`, requestBody);
        return res;
    }
};