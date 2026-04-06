'use server';

import { redirect } from "next/navigation";

import {
    Response,
    LoginPayload,
    VerifyEmailPayload,
    ResetPasswordPayload,
    FirebaseLoginPayload,
    SendVerificationEmailPayload,
} from "app/server-actions/types";
import { Client } from "@utils/client";
import { CookiesEnum } from "@constants/enums";
import { removeCookie } from "app/server-actions/cookieActions";
import { revalidatePath } from "next/cache";

export const login = async ({ email, password }: LoginPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: "/login",
            data: { email, password },
        });

        revalidatePath("/")
        return response;
    } catch (error: any) {
        return error;
    }
};


export const registerUser = async ({ email, password, firstName, lastName }: LoginPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: "/register",
            data: { email, password, firstName, lastName }
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const verifyEmail = async ({ id, uniqueId }: VerifyEmailPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: "/verify-email",
            data: { id, uniqueId }
        });

        revalidatePath("/")
        return response;
    } catch (error: any) {
        console.log('xxxxxx maillll', error)
        return error;
    }
};

export const sendPasswordResetEmail = async ({ email }: SendVerificationEmailPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: "/forgot_password",
            data: { email }
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const resetPassword = async ({ id, uniqueId, password}: ResetPasswordPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: `/verify_forgot_password`,
            data: { id, unique_id: uniqueId, password }
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const logout = async () => {
    await removeCookie(CookiesEnum.AUTH_TOKEN);
    redirect("/");
}

export const revalidatePage = async (path: string) => {
    revalidatePath(path);
}
