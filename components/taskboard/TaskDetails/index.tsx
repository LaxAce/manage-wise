"use client";

import { toast } from "sonner";
import { useState } from "react";

import { Options } from "@icons";
import ContextMenu from "@components/common/ContextMenu";
import { ITaskDetails } from "@components/taskboard/types";
import { DeleteTask, TaskForm } from "@components/taskboard";
import useWindowDimensions from "@hooks/useWindowDimensions";
import { CheckBox, Dropdown, Modal } from "@components/common";
import { EContextMenuPosition, EDropdownPosition } from "@constants/enums";
import { useGetTask, useUpdateSubTask, useGetBoardColumns, useUpdateTask } from "@hooks/useBoard";

const TaskDetails = ({ displayTask, setDisplayTask, currentTaskId, setCurrentTaskId, boardId }: ITaskDetails) => {
    const { isMobile } = useWindowDimensions();
    const [editTask, setEditTask] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);

    const { data: task, isLoading } = useGetTask(currentTaskId);
    const { mutateAsync: updateSubTask } = useUpdateSubTask(currentTaskId);
    const { mutateAsync: updateTask, isPending: isMoving } = useUpdateTask();
    const { data: boardColumns = [] } = useGetBoardColumns(boardId);

    const completedCount = task?.subTasks?.filter((s: any) => s.isCompleted).length ?? 0;
    const totalCount = task?.subTasks?.length ?? 0;

    // Build column options from the real board columns
    const columnOptions = boardColumns.map((col: any) => ({
        value: col.id,
        label: col.name,
    }));

    // Resolve the label of the column the task currently lives in
    const activeColumnLabel =
        columnOptions.find((opt: any) => opt.value === task?.boardColumnId)?.label ?? "";

    const handleSubTaskToggle = async (subTaskId: string, isCompleted: boolean) => {
        try {
            await updateSubTask({ subTaskId, isCompleted: !isCompleted });
        } catch (error: any) {
            toast.error(error);
        }
    };

    const handleColumnChange = async (selected: { value: string; label: string }) => {
        if (!task || selected.value === task.boardColumnId) return;
        try {
            await updateTask({
                taskId: currentTaskId,
                title: task.title,
                description: task.description ?? "",
                boardColumnId: selected.value,
                subTasks: task.subTasks?.map((s: any) => ({
                    id: s.id,
                    title: s.title,
                    isEditing: false,
                    isDeleting: false,
                })) ?? [],
            });
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <>
            <Modal
                isOpen={displayTask}
                onClose={() => {
                    setDisplayTask(false);
                    setCurrentTaskId(null);
                }}
                header={{
                    left: isLoading ? "Loading…" : task?.title,
                    right: (
                        <ContextMenu
                            position={isMobile ? EContextMenuPosition.LEFT : EContextMenuPosition.CENTER}
                            showOptions={showOptions}
                            setShowOptions={setShowOptions}
                            options={[
                                {
                                    label: "Edit Task",
                                    onClick: () => {
                                        setShowOptions(false);
                                        setDisplayTask(false);
                                        setEditTask(true);
                                    },
                                },
                                {
                                    label: "Delete Task",
                                    onClick: () => {
                                        setDisplayTask(false);
                                        setShowOptions(false);
                                        setShowDeleteTask(true);
                                    },
                                    isDestructive: true,
                                },
                            ]}
                        >
                            <Options />
                        </ContextMenu>
                    ),
                }}
            >
                {isLoading ? (
                    <div className="flex justify-center py-6">
                        <svg className="animate-spin w-6 h-6 text-violet-635FC7" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </div>
                ) : (
                    <>
                        {task?.description && (
                            <p className="text-[13px] leading-[23px] font-medium text-gray-828FA3">
                                {task.description}
                            </p>
                        )}

                        {totalCount > 0 && (
                            <div className="mt-6">
                                <span className="block mb-4 text-xs leading-[15px] dark:text-white-FFFFFF text-gray-828FA3">
                                    Subtasks ({completedCount} of {totalCount})
                                </span>

                                <div className="flex gap-y-2 flex-col">
                                    {task?.subTasks?.map((sub: any) => (
                                        <div key={sub.id} className="dark:bg-black-20212C bg-white-F4F7FD hover:!bg-violet-635FC740 p-3 rounded">
                                            <CheckBox
                                                value={sub.isCompleted}
                                                label={sub.title}
                                                onChange={() => handleSubTaskToggle(sub.id, sub.isCompleted)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {columnOptions.length > 0 && (
                            <div className="mt-6">
                                <Dropdown
                                    label={isMoving ? "Moving…" : "Current Status"}
                                    options={columnOptions}
                                    value={activeColumnLabel}
                                    position={EDropdownPosition.TOP}
                                    onChange={handleColumnChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </Modal>

            <TaskForm
                showModal={editTask}
                boardId={boardId}
                currentTaskId={currentTaskId}
                setShowModal={setEditTask}
            />
            <DeleteTask
                showModal={showDeleteTask}
                setShowModal={setShowDeleteTask}
                taskId={currentTaskId}
                taskTitle={task?.title ?? ""}
            />
        </>
    );
};

export default TaskDetails;
