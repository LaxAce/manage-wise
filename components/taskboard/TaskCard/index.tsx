import { ISubTasks } from "@components/taskboard/types";

const TaskCard = ({title, subTasks}: ISubTasks) => {
    return (
        <div className="task-card-wrapper cursor-pointer py-[23px] mb-5 bg-white-FFFFFF dark:bg-gray-2B2C37 duration-500 px-4 rounded-lg shadow-gray-E4EBFA dark:shadow-gray-364E7E1A shadow-lg">
            <h6 className="text-[15px] leading-[19px] dark:text-white-FFFFFF">{title}</h6>
            {subTasks.total ? (<p className="text-xs text-gray-828FA3 mt-2">{subTasks.completed} of {subTasks.total} {subTasks.total > 1 ? "substasks" : "subtask"}</p>) : null}
        </div>
    );
}

export default TaskCard;
