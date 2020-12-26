import React, { useContext, useState } from "react";
import { Auth } from "../../../Contexts/Auth";
import { closeModal } from "../../Shared/Animation";

function EditProject({ onFormSubmit, project }) {

    const [error, setError] = useState("");
    const { token } = useContext(Auth);

    const editProject = async (e) => {
        onFormSubmit(true);
        e.preventDefault();

        let title = e.target.elements[0].value;
        let status = e.target.elements[1].value;
        let priority = e.target.elements[2].value;
        let details = e.target.elements[3].value;

        const response = await fetch(`/projects/${project._id}`, {
            method: "put",
            body: JSON.stringify({ title, status, priority, details }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            window.location.reload(false);
        } else {
            onFormSubmit(false);
            setError("Unable to update project, try again later!");
        }
    }

    return <>
        <div className="modal full edit-project-modal">
            <div className="modal-wrapper" onClick={() => closeModal('.edit-project-modal', '.modal-content')}></div>
            <div className="flex center h-100">
                <div className="modal-content flex flex-column h-center p2">
                    <div className="flex v-center">
                        <h3>New Task</h3>
                        <div className="spacer"></div>
                        <span className="pointer" onClick={() => closeModal('.edit-project-modal', '.modal-content')}><strong>&#x2715;</strong></span>
                    </div>

                    <form onSubmit={editProject}>

                        {error && <p className="text-danger">{error}</p>}

                        <input type="text" defaultValue={unescape(project.title)} required />

                        <label htmlFor="status">Current Status is {unescape(project.status)}</label>
                        <select id="status" required>
                            <option value="">Status</option>
                            <option value="Open" defaultValue>Open</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <label htmlFor="priority">Current Priority is {unescape(project.priority)}</label>
                        <select id="priority" required>
                            <option value="">Priority</option>
                            <option value="Low" defaultValue>Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <textarea placeholder="Details" defaultValue={unescape(project.details)} rows="5" required></textarea>

                        <button type="submit">Edit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default EditProject