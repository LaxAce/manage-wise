"use client";

import { useState } from "react";

import { TaskCard, TaskDetails } from "@components/taskboard";
import { ISubTasks, ITaskColumn } from "@components/taskboard/types";

const TaskColumn = ({ id, title, colorTag, items, boardId }: ITaskColumn & { boardId: string }) => {
    const [displayTask, setDisplayTask] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState<string>("");

    const displayTasks = (items: ISubTasks[]) =>
        items?.map((item: ISubTasks, index: number) => (
            <TaskCard
                key={item.id ?? index}
                id={item.id}
                title={item.title}
                subTasks={item.subTasks}
                onClick={() => {
                    setCurrentTaskId(item.id);
                    setDisplayTask(true);
                }}
            />
        ));

    return (
        <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold">
                <span
                    className="w-[15px] h-[15px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: colorTag ?? "#49C4E5" }}
                />
                {title} ({items.length})
            </span>
            <div className="overflow-y-auto h-[calc(100svh-130px)] sm:h-[calc(100svh-153px)]">
                {displayTasks(items)}
            </div>

            <TaskDetails
                boardId={boardId}
                displayTask={displayTask}
                currentTaskId={currentTaskId}
                setDisplayTask={setDisplayTask}
                setCurrentTaskId={setCurrentTaskId}
            />
        </div>
    );
};

export default TaskColumn;
