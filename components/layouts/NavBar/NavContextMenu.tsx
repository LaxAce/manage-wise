"use client";

import { useState } from "react";

import { Options } from "@icons";
import { EContextMenuPosition } from "@constants/enums";
import ContextMenu from "@components/common/ContextMenu";
import { NavContextProps } from "@components/layouts/types";

const NavContextMenu = ({ setShowBoardForm, setShowDeleteBoard }: NavContextProps) => {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <>
            <ContextMenu
                position={EContextMenuPosition.LEFT}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
                options={[
                    {
                        label: "Edit Board",
                        onClick: () => { 
                            setShowBoardForm(true);
                            setShowOptions(false);
                        }
                    },
                    {
                        label: "Delete Board",
                        onClick: () => {
                            setShowDeleteBoard(true);
                            setShowOptions(false);
                         },
                        isDestructive: true
                    }
                ]}
            >
                <Options />
            </ContextMenu>
        </>
    )
}

export default NavContextMenu;
