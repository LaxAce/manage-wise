"use client";

import { useState } from "react";

import { Button, Dropdown, Input, Modal } from "@components/common";
import { ITaskForm } from "@components/taskboard/types";
import { Close } from "@icons";
import { EDropdownPosition } from "@constants/enums";

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

const TaskForm = ({ showModal, setShowModal, currentTaskId }: ITaskForm) => {
    const [title, setTitle] = useState(currentTaskId || "");
    const [description, setDescription] = useState("");
    const [currentStatus, setCurrentStatus] = useState("Todo");


    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            header={{ left: currentTaskId ? "Edit Task" : "Add New Task" }}
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
                        }}
                        placeholder="e.g. Take coffee break"
                    />

                    <Input
                        type="textarea"
                        id="description"
                        value={description}
                        label="Description"
                        onChange={(value) => setDescription(value)}
                        placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little."
                    />
                </div>

                <div>
                    {[1, 2].map(item => (
                        <div key={item} className="mb-3">
                            <Input
                                id="title"
                                placeholder="e.g. Make coffee"
                                error={item == 1 ? "Can't be empty" : ""}
                                label={item === 1 ? "Subtasks" : ""}
                                icon={<div className="cancel-btn-wrapper">
                                    <Close onClick={() => { }} />
                                </div>}
                            />
                        </div>
                    ))}

                    <Button variant="secondary" width="100%">
                        + Add New Subtask
                    </Button>
                </div>

                <div>
                    <Dropdown
                        label={"Status"}
                        options={options}
                        value={currentStatus}
                        position={EDropdownPosition.TOP}
                        onChange={(value) => setCurrentStatus(value.label)}
                    />
                </div>

                <Button width="100%">
                    {currentTaskId ? "Save Changes" : "Create Task"}
                </Button>
            </div>
        </Modal>
    );
}

export default TaskForm;
