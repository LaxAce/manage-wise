import { ResponseStatusEnum } from "@/constants/enums";

export interface Response {
    status: ResponseStatusEnum;
    data: any;
    error?: any;
    message?: any
}

export interface LoginPayload {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface FirebaseLoginPayload {
    idToken: string;
}

export interface SendVerificationEmailPayload {
    email: string;
}

export interface VerifyEmailPayload {
    id: string;
    uniqueId: string;
}

export interface ResetPasswordPayload {
    id: string;
    uniqueId: string;
    password: string;
}

export interface CreateProposalPayload {
    monthlyElectricityConsumption: number,
    state: string,
    roofType: string,
    roofOrientation: string,
    address: string,
    customerName: string,
    numberOfOccupants: number,
    preferredLeaseTerm: number,
    userType: residential,
    generatorSize: number,
    monthlyElectricityCost: number,
    latitude: number,
    longitude: number,
    imageUrl: string,
    phoneNumber: string,
}

export interface UpdateProposalPayload {
    monthlyElectricityConsumption: number,
    state: string,
    roofType: string,
    roofOrientation: string,
    address: string,
    customerName: string,
    numberOfOccupants: number,
    preferredLeaseTerm: number,
    userType: residential,
    generatorSize: number,
    monthlyElectricityCost: number,
    latitude: number,
    longitude: number,
    imageUrl: string,
    id: string,
}

export interface PostChatPayload {
    message: string,
    id: string,
}

export interface GetLogsPayload {
    page?: number;
    endDate?: any;
    limit?: number;
    startDate?: any;
    logType?: string;
    uniqueId?: string;
}
export interface GetProposalPayload {
    page?: number;
    endDate?: any;
    email?: string;
    limit?: number;
    userId?: string;
    startDate?: any;
    proposalId?: string;
}

export interface CreateBoardPayload {
    name: string;
    columns?: string[];
}

export interface CreateColumnPayload {
    name: string;
    boardId: string;
}

export interface CreateTaskPayload {
    title: string;
    subTasks?: string[];
    description?: string;
    boardColumnId: string;
}

export interface updateBoardPayload {
    name: string;
    boardId: string;
    columns: {
        id?: string;
        name: string;
        isEditing: boolean;
        isDeleting: boolean;
    }[];
}

export interface updateTaskPayload {
    title: string;
    description?: string;
    subTasks?: {
        id?: string;
        title: string;
        isEditing: boolean;
        isDeleting: boolean;
    }[];
    boardColumnId: string;
    taskId: string;
}

export interface updateSubTaskPayload {
    subTaskId: string;
    isCompleted: boolean;
}

