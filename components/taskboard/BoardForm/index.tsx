"use client";

import { useState } from "react";

import { Close } from "@icons";
import { IBoardForm } from "@components/taskboard/types";
import { Button, Input, Modal } from "@components/common";

const BoardForm = ({ showModal, setShowModal, currentBoardId }: IBoardForm) => {
    const [name, setName] = useState(currentBoardId || "");

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            header={{ left: currentBoardId ? "Edit Board" : "Add New Board" }}
        >
            <div className="flex flex-col gap-6">
                <Input
                    id="name"
                    label="Board Name"
                    value={name}
                    onChange={(value) => {
                        setName(value);
                    }}
                    placeholder="e.g. Web Development"
                />

                <div>
                    {[1, 2].map(item => (
                        <div key={item} className="mb-3">
                            <Input
                                id="columns"
                                placeholder="e.g. Todo"
                                error={item == 1 ? "Can't be empty" : ""}
                                label={item === 1 ? "Board Columns" : ""}
                                icon={<div className="cancel-btn-wrapper">
                                    <Close onClick={() => { }} />
                                </div>}
                            />
                        </div>
                    ))}

                    <Button variant="secondary" width="100%">
                        + Add New Column
                    </Button>
                </div>

                <Button width="100%">
                    {currentBoardId ? "Save Changes" : "Create New Board"}
                </Button>
            </div>
        </Modal>
    );
}

export default BoardForm;
