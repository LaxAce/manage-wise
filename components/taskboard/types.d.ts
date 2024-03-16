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
    currentTaskId: any;
    displayTask: boolean;
    setCurrentTaskId: (value: any) => void;
    setDisplayTask: (value: boolean) => void;
}

export interface IAddNewTask {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}