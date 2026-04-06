"use server";

import { cookies } from "next/headers";

export const getCookie = async (cookieName: string) => {
    const headers = cookies();
    const cookieValue = headers.get(cookieName)?.value;
    return cookieValue ?? null;
};

export const removeCookie = async (cookieName: string) => {
    const headers = cookies();
    headers.set(cookieName, '', { expires: new Date(0) });
};
