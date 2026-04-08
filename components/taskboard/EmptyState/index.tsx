"use client";

import { useState } from "react";

import { Button } from "@components/common";
import ColumnForm from "@components/taskboard/ColumnForm";

const EmptyState = ({ boardId }: { boardId: string }) => {
    const [showColumnForm, setShowColumnForm] = useState(false);

    return (
        <>
            <div className="w-full h-[80%] flex items-center flex-col justify-center">
                <p className="text-lg text-gray-828FA3 text-center leading-[23px]">
                    This board is empty. Create a new column to get started.
                </p>
                <Button
                    isDisabled={!boardId}
                    variant="primary"
                    size="large"
                    className="mt-8"
                    onClick={() => setShowColumnForm(true)}
                >
                    + Add New Column
                </Button>
            </div>

            <ColumnForm
                boardId={boardId}
                showModal={showColumnForm}
                setShowModal={setShowColumnForm}
            />
        </>
    );
};

export default EmptyState;
