"use client";

import { useState } from "react";

import { TaskCard, TaskDetails } from "@components/taskboard";
import { ISubTasks, ITaskColumn } from "@components/taskboard/types";

const TaskColumn = ({ title, items }: ITaskColumn) => {
    const [displayTask, setDisplayTask] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState<any>(null);

    const displayTasks = (items: ISubTasks[]) => items?.map((item: ISubTasks, index: number) => (
        <TaskCard
            key={index}
            title={item.title}
            subTasks={item.subTasks}
            onClick={() => {
                setCurrentTaskId(item.title);
                setDisplayTask(true);
            }}
        />
    ))

    return (
        <div className="w-[280px] flex-shrink-0">
            <span className="flex items-center mb-6 gap-2 text-xs text-gray-828FA3 tracking-[2.4px] font-semibold"><span className="bg-[#49C4E5] w-[15px] h-[15px] rounded-full" /> {title} ({items.length})</span>
            {displayTasks(items)}

            <TaskDetails
                displayTask={displayTask}
                currentTaskId={currentTaskId}
                setDisplayTask={setDisplayTask}
                setCurrentTaskId={setCurrentTaskId}
            />
        </div>
    );
}

export default TaskColumn;
