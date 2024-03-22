export interface ISubTasks {
    title: string;
    subTasks: {
        completed: number;
        total: number;
    };
    onClick: () => void;
}

export interface ITaskColumn {
    title: string;
    items: ITaskCard[];
}

export interface ITaskDetails {
    displayTask: boolean;
    currentTaskId: string;
    setCurrentTaskId: (value: any) => void;
    setDisplayTask: (value: boolean) => void;
}

export interface ITaskForm {
    showModal: boolean;
    currentTaskId?: string;
    setShowModal: (value: boolean) => void;
}

export interface IBoardForm {
    showModal: boolean;
    currentBoardId?: string;
    setShowModal: (value: boolean) => void;
}
