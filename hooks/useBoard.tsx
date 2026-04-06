"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ResponseStatusEnum } from "@constants/enums";
import {
    getBoards,
    getBoard,
    getTask,
    getBoardColumns,
    createBoard,
    createColumn,
    createTask,
    updateBoard,
    updateTask,
    updateSubTask,
    deleteBoard,
    deleteTask,
} from "app/server-actions/boardActions";
import {
    Response,
    CreateBoardPayload,
    CreateColumnPayload,
    CreateTaskPayload,
    updateBoardPayload,
    updateTaskPayload,
    updateSubTaskPayload,
} from "app/server-actions/types";

export const useGetBoards = () => {
    return useQuery({
        queryKey: ["boards"],
        queryFn: async () => {
            const res = await getBoards();
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
    });
};

export const useGetBoard = (id: string) => {
    return useQuery({
        queryKey: ["board", id],
        queryFn: async () => {
            const res = await getBoard(id);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        enabled: !!id,
    });
};

export const useGetTask = (id: string) => {
    return useQuery({
        queryKey: ["task", id],
        queryFn: async () => {
            const res = await getTask(id);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        enabled: !!id,
    });
};

export const useGetBoardColumns = (boardId: string) => {
    return useQuery({
        queryKey: ["boardColumns", boardId],
        queryFn: async () => {
            const res = await getBoardColumns(boardId);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        enabled: !!boardId,
    });
};

export const useCreateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, CreateBoardPayload>({
        mutationKey: ["createBoard"],
        mutationFn: async (payload) => {
            const res = await createBoard(payload);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
        },
        onError(error) {
            console.error("Create Board Error:", error);
        },
    });
};

export const useCreateColumn = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, CreateColumnPayload>({
        mutationKey: ["createColumn"],
        mutationFn: async (payload) => {
            const res = await createColumn(payload);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess(_, variables) {
            queryClient.invalidateQueries({ queryKey: ["board", variables.boardId] });
            queryClient.invalidateQueries({ queryKey: ["boardColumns", variables.boardId] });
        },
        onError(error) {
            console.error("Create Column Error:", error);
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, CreateTaskPayload>({
        mutationKey: ["createTask"],
        mutationFn: async (payload) => {
            const res = await createTask(payload);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError(error) {
            console.error("Create Task Error:", error);
        },
    });
};

export const useUpdateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, updateBoardPayload>({
        mutationKey: ["updateBoard"],
        mutationFn: async (payload) => {
            const res = await updateBoard(payload);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess(_, variables) {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
            queryClient.invalidateQueries({ queryKey: ["board", variables.boardId] });
        },
        onError(error) {
            console.error("Update Board Error:", error);
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, updateTaskPayload>({
        mutationKey: ["updateTask"],
        mutationFn: async (payload) => {
            const res = await updateTask(payload);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess(_, variables) {
            queryClient.invalidateQueries({ queryKey: ["task", variables.taskId] });
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError(error) {
            console.error("Update Task Error:", error);
        },
    });
};

export const useUpdateSubTask = (taskId: string) => {
    const queryClient = useQueryClient();
 
    return useMutation<Response, Error, updateSubTaskPayload>({
        mutationKey: ["updateSubTask"],
        mutationFn: async (payload) => {
            const res = await updateSubTask(payload);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onMutate: async (payload) => {
            await queryClient.cancelQueries({ queryKey: ["task", taskId] });
 
            const previousTask = queryClient.getQueryData(["task", taskId]);
 
            queryClient.setQueryData(["task", taskId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    subTasks: old.subTasks?.map((s: any) =>
                        s.id === payload.subTaskId
                            ? { ...s, isCompleted: payload.isCompleted }
                            : s
                    ),
                };
            });
 
            return { previousTask };
        },
        onError(error, _payload, context: any) {
            if (context?.previousTask) {
                queryClient.setQueryData(["task", taskId], context.previousTask);
            }
            console.error("Update SubTask Error:", error);
        },
    });
};

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, string>({
        mutationKey: ["deleteBoard"],
        mutationFn: async (boardId) => {
            const res = await deleteBoard(boardId);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
        },
        onError(error) {
            console.error("Delete Board Error:", error);
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Response, Error, string>({
        mutationKey: ["deleteTask"],
        mutationFn: async (taskId) => {
            const res = await deleteTask(taskId);
            if (res?.status === ResponseStatusEnum.SUCCESS) return res.data;
            else throw res?.message ?? res?.error?.message ?? "An unexpected error occurred";
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError(error) {
            console.error("Delete Task Error:", error);
        },
    });
};
