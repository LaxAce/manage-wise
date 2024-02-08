import { RadioInputProps } from "@components/common/types";

const RadioInput = ({ value, onChange, isBig }: RadioInputProps) => {
    return (
        <div
            className={
                value
                    ? `RadioInput active ${isBig ? "big" : ""}`
                    : `RadioInput ${isBig ? "big" : ""}`
            }
            onClick={onChange}
        >
            <div className={`Knob ${isBig ? "big" : ""}`}/>
        </div>
    );
}

export default RadioInput;
