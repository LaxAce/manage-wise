"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Close } from "@icons";
import { IBoardForm } from "@components/taskboard/types";
import { Button, Input, Modal } from "@components/common";
import { useCreateBoard, useUpdateBoard, useGetBoardColumns, useGetBoards } from "@hooks/useBoard";

interface ColumnField {
    id?: string;
    value: string;
    isEditing: boolean;
    isDeleting: boolean;
}

const BoardForm = ({ showModal, setShowModal, currentBoardId }: IBoardForm) => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [columns, setColumns] = useState<ColumnField[]>([
        { value: "", isEditing: false, isDeleting: false },
    ]);

    const { mutateAsync: createBoard, isPending: isCreating } = useCreateBoard();
    const { mutateAsync: updateBoard, isPending: isUpdating } = useUpdateBoard();

    const isEditing = !!currentBoardId;
    const isPending = isCreating || isUpdating;

    // Fetch existing board data only when editing — both are already cached so no extra requests
    const { data: boardsData } = useGetBoards();
    const { data: existingColumns = [] } = useGetBoardColumns(isEditing ? currentBoardId! : "");

    // Populate default columns
    useEffect(() => {
        if (!isEditing) {
            setColumns([
                { value: "Todo", isEditing: false, isDeleting: false },
                { value: "Doing", isEditing: false, isDeleting: false },
                { value: "Done", isEditing: false, isDeleting: false },
            ])
        }
    }, [isEditing, showModal]);

    // Populate fields when the modal opens in edit mode
    useEffect(() => {
        if (showModal && isEditing) {
            // Board name — resolve from the already-cached boards list
            const board = boardsData?.boards?.find((b: any) => b.id === currentBoardId);
            if (board) setName(board.name);

            // Columns — map API shape { id, name } → ColumnField
            if (existingColumns.length) {
                setColumns(
                    existingColumns.map((col: any) => ({
                        id: col.id,
                        value: col.name,
                        isEditing: false,
                        isDeleting: false,
                    }))
                );
            }
        }

        // Reset when modal closes
        if (!showModal) {
            setName("");
            setNameError("");
            setColumns([{ value: "", isEditing: false, isDeleting: false }]);
        }
    }, [showModal]);

    const addColumn = () => {
        setColumns(prev => [...prev, { value: "", isEditing: false, isDeleting: false }]);
    };

    const removeColumn = (index: number) => {
        setColumns(prev => {
            const col = prev[index];
            if (col.id) {
                // Existing column — mark for deletion so the API removes it
                return prev.map((c, i) => i === index ? { ...c, isDeleting: true } : c);
            }
            // New unsaved column — just drop it from the array entirely
            return prev.filter((_, i) => i !== index);
        });
    };

    const updateColumnValue = (index: number, value: string) => {
        setColumns(prev =>
            prev.map((col, i) =>
                i === index ? { ...col, value, isEditing: !!col.id } : col
            )
        );
    };

    const handleSubmit = async () => {
        try {
            if (!name.trim()) {
                setNameError("Board name can't be empty");
                return;
            }
            setNameError("");

            if (isEditing) {
                await updateBoard({
                    name: name.trim(),
                    boardId: currentBoardId!,
                    // Send all columns including deletions — the API handles each case
                    columns: columns
                        .filter(col => col.isDeleting || col.value.trim())
                        .map(col => ({
                            id: col.id,
                            name: col.value.trim(),
                            isEditing: col.isEditing,
                            isDeleting: col.isDeleting,
                        })),
                });
            } else {
                await createBoard({
                    name: name.trim(),
                    columns: columns.map(col => col.value.trim()).filter(Boolean),
                });
            }

            setShowModal(false);
        } catch (error: any) {
            toast.error(error);
        }
    };

    // Visible columns — hide ones marked for deletion while the request is in flight
    const visibleColumns = columns.filter(col => !col.isDeleting);

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            header={{ left: isEditing ? "Edit Board" : "Add New Board" }}
        >
            <div className="flex flex-col gap-6">
                <Input
                    id="name"
                    label="Board Name"
                    value={name}
                    onChange={(value) => {
                        setName(value);
                        setNameError("");
                    }}
                    placeholder="e.g. Web Development"
                    error={nameError}
                />

                <div>
                    {visibleColumns.map((col, index) => (
                        <div key={col.id ?? index} className="mb-3">
                            <Input
                                id={`column-${col.id ?? index}`}
                                placeholder="e.g. Todo"
                                label={index === 0 ? "Board Columns" : ""}
                                value={col.value}
                                onChange={(value) => {
                                    // Map back to the real index in the full columns array
                                    const realIndex = columns.indexOf(col);
                                    updateColumnValue(realIndex, value);
                                }}
                                icon={
                                    <div className="cancel-btn-wrapper">
                                        <Close onClick={() => {
                                            const realIndex = columns.indexOf(col);
                                            removeColumn(realIndex);
                                        }} />
                                    </div>
                                }
                            />
                        </div>
                    ))}

                    <Button variant="secondary" width="100%" onClick={addColumn}>
                        + Add New Column
                    </Button>
                </div>

                <Button width="100%" isLoading={isPending} onClick={handleSubmit}>
                    {isEditing ? "Save Changes" : "Create New Board"}
                </Button>
            </div>
        </Modal>
    );
};

export default BoardForm;
