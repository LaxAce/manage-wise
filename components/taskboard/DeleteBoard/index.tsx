"use client";

import { toast } from "sonner";

import { Button, Modal } from "@components/common";
import { IDeleteBoard } from "@components/taskboard/types";
import { useDeleteBoard } from "@hooks/useBoard";

const DeleteBoard = ({ showModal, setShowModal, boardId, boardName }: IDeleteBoard) => {
    const { mutateAsync: deleteBoard, isPending } = useDeleteBoard();

    const handleDelete = async () => {
        try {
            await deleteBoard(boardId);
            setShowModal(false);
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            leftHeaderClass="text-red-EA5555 dark:text-red-EA5555"
            header={{ left: "Delete this board?" }}
        >
            <div className="flex flex-col gap-6">
                <p className="text-[13px] leading-[23px] font-medium text-gray-828FA3">
                    Are you sure you want to delete the &apos;{boardName}&apos; board? This action will remove all columns and tasks and cannot be reversed.
                </p>
                <div className="flex justify-end gap-4">
                    <Button variant="destructive" width="100%" isLoading={isPending} onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" width="100%" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteBoard;
