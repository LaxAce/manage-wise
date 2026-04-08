'use server';

import { redirect } from "next/navigation";

import {
    Response,
    LoginPayload,
    VerifyEmailPayload,
    ResetPasswordPayload,
    SendVerificationEmailPayload,
    CreateBoardPayload,
    CreateTaskPayload,
    updateBoardPayload,
    updateTaskPayload,
    updateSubTaskPayload,
    CreateColumnPayload,
} from "app/server-actions/types";
import { Client } from "@utils/client";
import { CookiesEnum } from "@constants/enums";
import { removeCookie } from "app/server-actions/cookieActions";
import { revalidatePath } from "next/cache";

export const getBoards = async (): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "GET",
            path: "/boards",
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const getBoard = async (id: string): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "GET",
            path: `/boards/${id}`,
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const getTask = async (id: string): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "GET",
            path: `/tasks/${id}`,
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const getBoardColumns = async (boardId: string): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "GET",
            path: `/columns/${boardId}`,
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const createBoard = async (payload: CreateBoardPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: `/boards`,
            data: payload
        });

        return response;
    } catch (error: any) {
        return error;
    }
};
export const createColumn = async (payload: CreateColumnPayload): Promise<Response | any> => {
    try {
        const { boardId, ...rest } = payload;
        const response = await Client({
            method: "POST",
            path: `/columns/${boardId}`,
            data: rest
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const createTask = async (payload: CreateTaskPayload): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "POST",
            path: `/tasks`,
            data: payload
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const updateBoard = async (payload: updateBoardPayload): Promise<Response | any> => {
    try {
        const { boardId, ...rest } = payload;

        const response = await Client({
            method: "PUT",
            path: `/boards/${boardId}`,
            data: rest
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const updateTask = async (payload: updateTaskPayload): Promise<Response | any> => {
    try {
        const { taskId, ...rest } = payload;

        const response = await Client({
            method: "PUT",
            path: `/tasks/${taskId}`,
            data: rest
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const updateSubTask = async (payload: updateSubTaskPayload): Promise<Response | any> => {
    try {
        const { subTaskId, ...rest } = payload;

        const response = await Client({
            method: "PATCH",
            path: `/sub_task/${subTaskId}`,
            data: rest
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const deleteBoard = async (boardId: string): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "DELETE",
            path: `/boards/${boardId}`,
        });

        return response;
    } catch (error: any) {
        return error;
    }
};

export const deleteTask = async (taskId: string): Promise<Response | any> => {
    try {
        const response = await Client({
            method: "DELETE",
            path: `/tasks/${taskId}`,
        });

        return response;
    } catch (error: any) {
        return error;
    }
};
