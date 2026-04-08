"use client";

import { toast } from "sonner";

import { useDeleteTask } from "@hooks/useBoard";
import { Button, Modal } from "@components/common";
import { IDeleteTask } from "@components/taskboard/types";

const DeleteTask = ({ showModal, setShowModal, taskId, taskTitle }: IDeleteTask) => {
    const { mutateAsync: deleteTask, isPending } = useDeleteTask();

    const handleDelete = async () => {
        try {
            await deleteTask(taskId);
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
            header={{ left: "Delete this task?" }}
        >
            <div className="flex flex-col gap-6">
                <p className="text-[13px] leading-[23px] font-medium text-gray-828FA3">
                    Are you sure you want to delete the &apos;{taskTitle}&apos; task? This action will remove all subtasks and cannot be reversed.
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

export default DeleteTask;
