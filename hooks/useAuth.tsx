"use client";

import { ResponseStatusEnum } from "@constants/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    login,
    registerUser,
    sendPasswordResetEmail,
    resetPassword,
    verifyEmail,
} from "app/server-actions/authActions";
import {
    Response,
    LoginPayload,
    SendVerificationEmailPayload,
    ResetPasswordPayload,
    VerifyEmailPayload,
} from "app/server-actions/types";


export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, LoginPayload>({
        mutationKey: ["login"],
        mutationFn: async (payload) => {
            const res = await login(payload);
            if (res?.status == ResponseStatusEnum.SUCCESS) return res.data
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred"
        },
        onSuccess(data) {
            if (data?.status == ResponseStatusEnum.SUCCESS) {
                const res = Object.values(data.data ?? {});

                queryClient.setQueryData(["login"], {
                    data: res,
                });
            }
        },
        onError(error) {
            console.error("Login Error:", error);
        }
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, LoginPayload>({
        mutationKey: ["register"],
        mutationFn: async (payload) => {
            const res = await registerUser(payload);
            if (res?.status == ResponseStatusEnum.SUCCESS) return res.data
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred"
        },
        onSuccess(data) {
            if (data?.status === ResponseStatusEnum.SUCCESS) {
                const res = Object.values(data.data ?? {});

                queryClient.setQueryData(["register"], {
                    data: res,
                });
            }
        },
        onError(error) {
            console.error("Signup Error:", error);
        }
    })
};

export const useVerifyEmail = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, VerifyEmailPayload>({
        mutationKey: ["verifyEmail"],
        mutationFn: async (payload) => {
            const res = await verifyEmail(payload);
            if (res?.status == ResponseStatusEnum.SUCCESS) return res.message
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred"
        },
        onSuccess(data) {
            if (data?.status == ResponseStatusEnum.SUCCESS) {
                const res = Object.values(data.message ?? {});
                queryClient.setQueryData(["verifyEmail"], { data: res })
            }
        },
        onError(error) {
            console.error("Verify Email Error:", error)
        }
    })
};

export const useSendPasswordResetEmail = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, SendVerificationEmailPayload>({
        mutationKey: ["sendPasswordResetEmail"],
        mutationFn: async (payload) => {
            const res = await sendPasswordResetEmail(payload);
            if (res?.status == ResponseStatusEnum.SUCCESS) return res.message
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred"
        },
        onSuccess(data) {
            if (data?.status == ResponseStatusEnum.SUCCESS) {
                const res = Object.values(data.message ?? {});
                queryClient.setQueryData(["sendPasswordResetEmail"], { data: res })
            }
        },
        onError(error) {
            console.error("Send password reset Email Error:", error)
        }
    })
}

export const useResetPassword = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, ResetPasswordPayload>({
        mutationKey: ["resetPassword"],
        mutationFn: async (payload) => {
            const res = await resetPassword(payload);
            if (res?.status == ResponseStatusEnum.SUCCESS) return res.message
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred"
        },
        onSuccess(data) {
            if (data?.status == ResponseStatusEnum.SUCCESS) {
                const res = Object.values(data.message ?? {});
                queryClient.setQueryData(["resetPassword"], { data: res })
            }
        },
        onError(error) {
            console.error("Reset password Error:", error)
        },
    })
}
