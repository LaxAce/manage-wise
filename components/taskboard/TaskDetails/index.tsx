"use client";

import { useState } from "react";

import { Options } from "@icons";
import { EContextMenuPosition } from "@constants/enums";
import ContextMenu from "@components/common/ContextMenu";
import { ITaskDetails } from "@components/taskboard/types";
import { DeleteTask, TaskForm } from "@components/taskboard";
import useWindowDimensions from "@hooks/useWindowDimensions";
import { CheckBox, Dropdown, Modal } from "@components/common";

const sub = [
    {
        title: "Research competitor pricing and business models",
        completed: true,
    },
    {
        title: "Outline a business model that works for our solution",
        completed: true,
    },
    {
        title: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
        completed: false,
    },
];

const options = [
    {
        value: "todo",
        label: "Todo",
    },
    {
        value: "doing",
        label: "Doing",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "review",
        label: "Review",
    },
    {
        value: "closed",
        label: "Closed",
    },
]

const TaskDetails = ({ displayTask, setDisplayTask, currentTaskId, setCurrentTaskId }: ITaskDetails) => {
    const { isMobile } = useWindowDimensions();
    const [editTask, setEditTask] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("Doing");

    return (
        <>

            <Modal
                isOpen={displayTask}
                onClose={() => {
                    setDisplayTask(false);
                    setCurrentTaskId(null);
                }}
                header={{
                    left: currentTaskId,
                    right: (
                        <ContextMenu
                            position={EContextMenuPosition.LEFT}
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                            options={[
                                {
                                    label: "Edit Task",
                                    onClick: () => {
                                        setShowOptions(false);
                                        setDisplayTask(false);
                                        setEditTask(true);
                                    }
                                },
                                {
                                    label: "Delete Task",
                                    onClick: () => {
                                        setDisplayTask(false);
                                        setShowOptions(false);
                                        setShowDeleteTask(true);
                                    },
                                    isDestructive: true
                                }

                            ]}
                        >
                            <Options />
                        </ContextMenu>
                    )
                }}
            >
                <p className="text-[13px] leading-[23px] font-medium text-gray-828FA3">
                    We know what we&apos;re planning to build for version one. Now we need to finalise the first pricing model we&apos;ll use. Keep iterating the subtasks until we have a coherent proposition.
                </p>

                <div className="mt-6">
                    <span className="block mb-4 text-xs leading-[15px] dark:text-white-FFFFFF text-gray-828FA3">Subtasks (2 of 3)</span>

                    <div className="flex gap-y-2 flex-col">
                        {sub.map((item, index) => (
                            <div key={index} className="dark:bg-black-20212C bg-white-F4F7FD hover:!bg-violet-635FC740 p-3 rounded">
                                <CheckBox
                                    value={item.completed}
                                    label={item.title}
                                    onChange={(value) => {
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <Dropdown
                        options={options}
                        value={currentStatus}
                        label={"Current Status"}
                        onChange={(value) => setCurrentStatus(value.label)}
                    />
                </div>
            </Modal>
            <TaskForm showModal={editTask} currentTaskId={currentTaskId} setShowModal={setEditTask} />
            <DeleteTask showModal={showDeleteTask} setShowModal={setShowDeleteTask} currentTaskId={currentTaskId} />
        </>
    );
}

export default TaskDetails;
