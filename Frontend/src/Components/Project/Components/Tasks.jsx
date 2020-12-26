import React, { useContext } from "react";
import { Auth } from "../../../Contexts/Auth";

function Tasks({ onFormSubmit, tasks }) {

    const { token, user } = useContext(Auth);

    const modifyTask = async (trigger, id, project, assignee) => {
        onFormSubmit(true);
        if (user._id === assignee) {
            const response = await fetch(`/tasks/${trigger}/${project}/${id}`, {
                method: "put",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                window.location.reload(false);
            } else {
                onFormSubmit(false);
            }
        } else {
            onFormSubmit(false);
        }
    }


    return <>
        <div className="tasks">

            {tasks.map(task => (
                <div className="task flex mb-1" key={task._id}>

                    <span className="task-item flex flex-column">
                        <span className="task-title">Title</span>
                        <span>{unescape(task.title)}</span>
                    </span>

                    <span className="task-item flex flex-column">
                        <span className="task-title">Status</span>
                        <span>{unescape(task.status)}</span>
                    </span>

                    <span className="task-item flex flex-column">
                        <span className="task-title">Reported By</span>
                        <span>{unescape(task.reporter.name)}</span>
                    </span>

                    <span className="task-item flex flex-column">
                        <span className="task-title">Source</span>
                        <span>{unescape(task.source)}</span>
                    </span>

                    <span
                        className="task-item flex flex-column white-color" style={{ background: `var(--${task.priority})` }}>
                        <span className="task-title">Priority</span>
                        <span>{unescape(task.priority)}</span>
                    </span>

                    <span className="task-item flex flex-column">
                        <span className="task-title">Assignee</span>
                        <span>{unescape(task.assignee.name)}</span>
                    </span>

                    <span className="task-item flex flex-column">
                        <select onChange={e => modifyTask(e.currentTarget.value, task._id, task.project, task.assignee.id)}>
                            <option>Action</option>
                            <option value="start">Accept</option>
                            <option value="pend">Pend</option>
                            <option value="finish">Finish</option>
                        </select>
                    </span>
                </div>
            ))}
        </div>
    </>
}

export default Tasks