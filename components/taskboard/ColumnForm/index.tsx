"use client";

import { useState } from "react";
import { toast } from "sonner";

import { IColumnForm } from "@components/taskboard/types";
import { Button, Input, Modal } from "@components/common";
import { useCreateColumn } from "@hooks/useBoard";

const ColumnForm = ({ showModal, setShowModal, boardId }: IColumnForm) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { mutateAsync: createColumn, isPending } = useCreateColumn();

    const handleClose = () => {
        setName("");
        setError("");
        setShowModal(false);
    };

    const handleSubmit = async () => {
        try {
            if (!name.trim()) {
                setError("Column name can't be empty");
                return;
            }
            setError("");
            await createColumn({ name: name.trim(), boardId });
            handleClose();
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            onClose={handleClose}
            header={{ left: "Add New Column" }}
        >
            <div className="flex flex-col gap-6">
                <Input
                    id="column-name"
                    label="Column Name"
                    value={name}
                    onChange={(value) => {
                        setName(value);
                        setError("");
                    }}
                    placeholder="e.g. In Review"
                    error={error}
                />

                <Button width="100%" isLoading={isPending} onClick={handleSubmit}>
                    Create Column
                </Button>
            </div>
        </Modal>
    );
};

export default ColumnForm;
