import { Options } from "@icons";
import { EPosition } from "@constants/enums";
import ContextMenu from "@components/common/ContextMenu";

const NavContextMenu = ({showOptions, setShowOptions}: {showOptions: boolean, setShowOptions: (value: boolean) => void}) => {
    return (
        <ContextMenu
            position={EPosition.LEFT}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            options={[
                {
                    label: "Edit Board",
                    onClick: () => { }
                },
                {
                    label: "Delete Board",
                    onClick: () => { },
                    isDestructive: true
                }
            ]}
        >
            <Options />
        </ContextMenu>
    )
}

export default NavContextMenu;
