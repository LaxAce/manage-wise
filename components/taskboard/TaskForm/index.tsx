"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";

import { Close } from "@icons";
import { EDropdownPosition } from "@constants/enums";
import { ITaskForm } from "@components/taskboard/types";
import { Button, Dropdown, Input, Modal } from "@components/common";
import { useCreateTask, useGetBoardColumns, useGetTask, useUpdateTask } from "@hooks/useBoard";

interface SubTaskField {
    id?: string;
    value: string;
    isEditing: boolean;
    isDeleting: boolean;
}

const TaskForm = ({ showModal, setShowModal, currentTaskId, boardId }: ITaskForm) => {
    const isEditing = !!currentTaskId;

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [boardColumnId, setBoardColumnId] = useState("");
    const [subTasks, setSubTasks] = useState<SubTaskField[]>([]);

    const { data: boardColumns = [] } = useGetBoardColumns(boardId);
    const { data: existingTask } = useGetTask(isEditing ? currentTaskId! : "");

    const { mutateAsync: createTask, isPending: isCreating } = useCreateTask();
    const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask();

    const isPending = isCreating || isUpdating;

    const columnOptions = boardColumns.map((col: any) => ({
        value: col.id,
        label: col.name,
    }));

    const selectedColumnLabel = columnOptions.find((o: any) => o.value === boardColumnId)?.label ?? "";

    // Populate fields when editing
    useEffect(() => {
        if (isEditing && existingTask) {
            setTitle(existingTask.title ?? "");
            setDescription(existingTask.description ?? "");
            setBoardColumnId(existingTask.boardColumnId ?? "");
            setSubTasks(
                existingTask.subTasks?.map((s: any) => ({
                    id: s.id,
                    value: s.title,
                    isEditing: false,
                    isDeleting: false,
                })) ?? []
            );
        }
    }, [isEditing, existingTask]);

    // Set default column when creating
    useEffect(() => {
        if (!isEditing && columnOptions.length && !boardColumnId) {
            setBoardColumnId(columnOptions[0].value);
        }
    }, [columnOptions.length, isEditing, showModal]);

    const handleClose = () => {
        setTitle("");
        setTitleError("");
        setDescription("");
        setBoardColumnId("");
        setSubTasks([]);
        setShowModal(false);
    };

    const addSubTask = () => {
        setSubTasks(prev => [...prev, { value: "", isEditing: false, isDeleting: false }]);
    };

    const removeSubTask = (index: number) => {
        setSubTasks(prev => {
            const updated = [...prev];
            if (updated[index].id) {
                updated[index] = { ...updated[index], isDeleting: true };
            } else {
                updated.splice(index, 1);
            }
            return updated;
        });
    };

    const updateSubTaskValue = (index: number, value: string) => {
        setSubTasks(prev => prev.map((s, i) =>
            i === index ? { ...s, value, isEditing: !!s.id } : s
        ));
    };

    const handleSubmit = async () => {
        try {
            if (!title.trim()) {
                setTitleError("Title can't be empty");
                return;
            }
            if (!boardColumnId) {
                toast.error("Please select a status column");
                return;
            }
            setTitleError("");

            const activeSubTasks = subTasks.filter(s => !s.isDeleting);

            if (isEditing) {
                await updateTask({
                    taskId: currentTaskId!,
                    title: title.trim(),
                    description: description.trim(),
                    boardColumnId,
                    subTasks: subTasks.map(s => ({
                        id: s.id,
                        title: s.value.trim(),
                        isEditing: s.isEditing,
                        isDeleting: s.isDeleting,
                    })),
                });
            } else {
                await createTask({
                    title: title.trim(),
                    description: description.trim(),
                    boardColumnId,
                    subTasks: activeSubTasks.map(s => s.value.trim()).filter(Boolean),
                });
            }

            handleClose();
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            onClose={handleClose}
            header={{ left: isEditing ? "Edit Task" : "Add New Task" }}
        >
            <div className="flex flex-col gap-6">
                <div>
                    <Input
                        id="title"
                        label="Title"
                        value={title}
                        className="mb-6"
                        onChange={(value) => {
                            setTitle(value);
                            setTitleError("");
                        }}
                        placeholder="e.g. Take coffee break"
                        error={titleError}
                    />

                    <Input
                        type="textarea"
                        id="description"
                        value={description}
                        label="Description"
                        onChange={(value) => setDescription(value)}
                        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    />
                </div>

                <div>
                    {subTasks.map((sub, realIndex) => {
                        if (sub.isDeleting) return null;
                        const visibleIndex = subTasks
                            .slice(0, realIndex)
                            .filter(s => !s.isDeleting).length;
                        return (
                            <div key={sub.id ?? `new-${realIndex}`} className="mb-3">
                                <Input
                                    id={`subtask-${realIndex}`}
                                    placeholder="e.g. Make coffee"
                                    label={visibleIndex === 0 ? "Subtasks" : ""}
                                    value={sub.value}
                                    onChange={(value) => updateSubTaskValue(realIndex, value)}
                                    icon={
                                        <div className="cancel-btn-wrapper">
                                            <Close onClick={() => removeSubTask(realIndex)} />
                                        </div>
                                    }
                                />
                            </div>
                        );
                    })}

                    <Button variant="secondary" width="100%" onClick={addSubTask}>
                        + Add New Subtask
                    </Button>
                </div>

                <div>
                    <Dropdown
                        label="Status"
                        options={columnOptions}
                        value={selectedColumnLabel}
                        position={EDropdownPosition.TOP}
                        onChange={(item) => setBoardColumnId(item.value)}
                    />
                </div>

                <Button width="100%" isLoading={isPending} onClick={handleSubmit}>
                    {isEditing ? "Save Changes" : "Create Task"}
                </Button>
            </div>
        </Modal>
    );
};

export default TaskForm;
