import { Button, Modal } from "@components/common";
import { ITaskForm } from "@components/taskboard/types";

const DeleteTask = ({showModal, setShowModal, currentTaskId}: ITaskForm) => {
    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            leftHeaderClass="text-red-EA5555 dark:text-red-EA5555"
            header={{ left: "Delete this task?" }}
        >
            <div className="flex flex-col gap-6">
                <p className="text-[13px] leading-[23px] font-medium text-gray-828FA3">Are you sure you want to delete the &apos;{currentTaskId}&apos; task? This action will remove all subtasks and cannot be reversed.</p>
                <div className="flex justify-end gap-4">
                    <Button variant="destructive" width="100%">
                        Delete
                    </Button>
                    <Button variant="secondary" width="100%">
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteTask;
