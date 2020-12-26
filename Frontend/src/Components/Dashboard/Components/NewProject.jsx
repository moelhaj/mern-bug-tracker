import React, { useContext, useState } from "react";
import { Auth } from "../../../Contexts/Auth";
import { useHistory } from "react-router-dom";
import { closeModal } from "../../Shared/Animation";

function NewProject({ onFormSubmit }) {

    let history = useHistory();
    const [newError, setNewError] = useState("");
    const { token } = useContext(Auth);

    const newProject = async (e) => {
        onFormSubmit(true);
        e.preventDefault();

        let title = e.target.elements[0].value;
        let status = e.target.elements[1].value;
        let priority = e.target.elements[2].value;
        let details = e.target.elements[3].value;

        const response = await fetch('/projects', {
            method: "post",
            body: JSON.stringify({ title, status, priority, details }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            history.push("/");
            history.go(0);
        } else {
            onFormSubmit(false);
            setNewError("Unable to add Project, try again later!");
        }
    }

    return <>
        <div className="modal full newProject">
            <div className="modal-wrapper" onClick={() => closeModal('.newProject', '.modal-content')}></div>
            <div className="flex center h-100">
                <div className="modal-content flex flex-column h-center p2">
                    <div className="flex v-center">
                        <h3>New Project</h3>
                        <div className="spacer"></div>
                        <span className="pointer" onClick={() => closeModal('.newProject', '.modal-content')}><strong>&#x2715;</strong></span>
                    </div>
                    <form className="new-project" onSubmit={newProject}>

                        {newError && <p className="text-danger">{newError}</p>}

                        <input type="text" placeholder="Project Title" name="title" required />

                        <select name="status" required>
                            <option value="">Status</option>
                            <option value="Open" defaultValue>Open</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <select name="priority" required>
                            <option value="">Priority</option>
                            <option value="Low" defaultValue>Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <textarea placeholder="Details" name="details" rows="5" required></textarea>

                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default NewProject