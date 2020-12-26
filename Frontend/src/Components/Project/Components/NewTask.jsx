import React, { useContext, useState } from "react";
import { Auth } from "../../../Contexts/Auth";
import { closeModal } from "../../Shared/Animation";

function NewTask({ onFormSubmit, id, users }) {

    const [error, setError] = useState("");
    const { token, user } = useContext(Auth);

    const newTask = async (e) => {
        onFormSubmit(true);
        e.preventDefault();

        let project = id;
        let title = e.target.elements[0].value;
        let status = e.target.elements[1].value;
        let priority = e.target.elements[2].value;
        let source = e.target.elements[3].value;
        let assigned_to = e.target.elements[4].value.split('-');
        let assignee = { 'id': assigned_to[0], 'name': assigned_to[1] };
        let details = e.target.elements[5].value;
        let reporter = { 'id': user._id, 'name': user.name };

        const response = await fetch(`/tasks/${id}`, {
            method: "post",
            body: JSON.stringify({ project, title, status, priority, source, assignee, details, reporter }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            window.location.reload(false);
        } else {
            onFormSubmit(false);
            setError("Unable to add task, try again later!");
        }
    }

    return <>
        <div className="modal full new-ticket-modal">
            <div className="modal-wrapper" onClick={() => closeModal('.new-ticket-modal', '.modal-content')}></div>
            <div className="flex center h-100">
                <div className="modal-content flex flex-column h-center p2">
                    <div className="flex v-center">
                        <h3>New Task</h3>
                        <div className="spacer"></div>
                        <span className="pointer" onClick={() => closeModal('.new-ticket-modal', '.modal-content')}><strong>&#x2715;</strong></span>
                    </div>

                    <form className="new-task-form" onSubmit={newTask}>

                        {error && <p className="text-danger">{error}</p>}

                        <input type="text" placeholder="Title" maxLength="15" required />

                        <select name="status" required>
                            <option value="">Status</option>
                            <option value="Open" defaultValue>Open</option>
                            <option value="On Progress">On Progress</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <select name="priority" required>
                            <option value="">Priority</option>
                            <option value="Low" defaultValue>Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>

                        <select name="source" required>
                            <option value="">Source</option>
                            <option value="In-House" defaultValue>In-House</option>
                            <option value="Alpha Tester">Alpha Tester</option>
                            <option value="Beta Tester">Beta Tester</option>
                            <option value="Client">Client</option>
                            <option value="Support">Support</option>
                        </select>

                        <select name="assignee" required>
                            <option value="">Assigned To</option>
                            {users.map(user => (
                                <option key={user._id} value={`${user._id}-${user.name}`}>{user.name}</option>
                            ))}
                        </select>
                        <textarea placeholder="Details" name="details" rows="5" required></textarea>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default NewTask