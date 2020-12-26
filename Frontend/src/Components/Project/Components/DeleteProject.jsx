import React, { useContext } from "react";
import { Auth } from "../../../Contexts/Auth";
import { closeModal } from "../../Shared/Animation";
import { useHistory } from "react-router-dom";

function DeleteProject({ onFormSubmit, project }) {

    let history = useHistory();
    const { token } = useContext(Auth);

    const deleteProject = async () => {
        onFormSubmit(true);
        const response = await fetch(`/projects/${project._id}`, {
            method: "delete",
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 200) {
            history.push("/");
            history.go(0);
        } else {
            history.push("/");
            history.go(0);
        }
    }

    return <>
        <div className="modal full delete-project-modal">
            <div className="modal-wrapper" onClick={() => closeModal('.delete-project-modal', '.modal-content')}></div>
            <div className="flex center h-100">
                <div className="modal-content flex flex-column h-center p2">
                    <div className="flex v-center">
                        <h3>Delete {unescape(project.title)}</h3>
                        <div className="spacer"></div>
                        <span className="pointer" onClick={() => closeModal('.delete-project-modal', '.modal-content')}><strong>&#x2715;</strong></span>
                    </div>
                    <p>Are you sure you want to delete this project</p>
                    <div className="modal-controls flex">
                        <button className="danger" onClick={() => deleteProject()}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DeleteProject