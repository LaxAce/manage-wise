"use client";

import { useState } from "react";

import { IAddColumn } from "@components/taskboard/types";
import ColumnForm from "@components/taskboard/ColumnForm";

const AddColumn = ({ boardId, onClick }: IAddColumn) => {
    const [showColumnForm, setShowColumnForm] = useState(false);

    const handleClick = () => {
        setShowColumnForm(true);
        onClick?.();
    };

    return (
        <>
            <div className="w-[280px] h-[72svh] flex-shrink-0 pr-5 py-[23px]x mt-[40px]">
                <div
                    onClick={handleClick}
                    className="text-2xl leading-[30px] text-gray-828FA3 hover:text-violet-635FC7 bg-gray-E4EBFA dark:bg-gray-2B2C3720 duration-500 w-full h-full flex items-center justify-center cursor-pointer rounded-md"
                >
                    + New Column
                </div>
            </div>

            <ColumnForm
                boardId={boardId}
                showModal={showColumnForm}
                setShowModal={setShowColumnForm}
            />
        </>
    );
};

export default AddColumn;
