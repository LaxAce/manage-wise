export interface ISubTask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface ISubTasks {
    id: string;
    title: string;
    subTasks: {
        completed: number;
        total: number;
    };
    onClick: () => void;
}

export interface ITaskColumn {
    id: string;
    title: string;
    colorTag: string;
    items: ISubTasks[];
}

export interface ITaskDetails {
    displayTask: boolean;
    currentTaskId: string;
    boardId: string;
    setCurrentTaskId: (value: any) => void;
    setDisplayTask: (value: boolean) => void;
}

export interface ITaskForm {
    showModal: boolean;
    boardId: string;
    currentTaskId?: string;
    setShowModal: (value: boolean) => void;
}

export interface IBoardForm {
    showModal: boolean;
    currentBoardId?: string;
    setShowModal: (value: boolean) => void;
}

export interface IColumnForm {
    showModal: boolean;
    boardId: string;
    setShowModal: (value: boolean) => void;
}

export interface IDeleteBoard {
    showModal: boolean;
    boardId: string;
    boardName: string;
    setShowModal: (value: boolean) => void;
}

export interface IDeleteTask {
    showModal: boolean;
    taskId: string;
    taskTitle: string;
    setShowModal: (value: boolean) => void;
}

export interface IAddColumn {
    boardId: string;
    onClick: () => void;
}
