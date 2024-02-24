export interface ISubTasks {
    title: string;
    subTasks: {
        completed: number;
        total: number;
    };
}

export interface ITaskColumn {
    title: string;
    items: ITaskCard[];
}
