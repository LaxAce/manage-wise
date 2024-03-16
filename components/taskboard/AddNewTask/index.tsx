"use client";

import { useState } from "react";

import { Input, Modal } from "@components/common";
import { IAddNewTask } from "@components/taskboard/types";
import { Close } from "@icons";

const AddNewTask = ({ showModal, setShowModal }: IAddNewTask) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            header={{ left: "Add New Task" }}
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
                        <div className="mb-3">
                            <Input
                                id="title"
                                label={item === 1 ? "Subtasks" : ""}
                                placeholder="e.g. Make coffee"
                                icon={<div className=" hover:*:bg-red-400">
                                    <Close onClick={() => { }}  />
                                </div>}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default AddNewTask;
