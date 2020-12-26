import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import { Auth } from "../../Contexts/Auth";
import { Global } from "../../Contexts/Global";
import { openMenu, closeMenu, openModal } from "../Shared/Animation";
import Loader from "../Shared/Loader";
import Tasks from "./Components/Tasks";
import NewTask from "./Components/NewTask";
import EditProject from "./Components/EditProject";
import DeleteProject from "./Components/DeleteProject";

import "./project.css";

function Project() {

    let history = useHistory();
    const location = useLocation();
    const { token, user } = useContext(Auth);
    const { users } = useContext(Global);
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState([]);
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        const getContext = async () => {
            let id = location.pathname.replace("/project/", "");
            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch(`/projects/${id}`, { headers });
            if (response.status === 200) {
                const data = await response.json();
                setProject(data);
                setLoading(false);
            } else {
                history.push("/projects");
                history.go(0);
            }
        }
        getContext();
    }, [token, location, history])

    // Toggle menu

    function toggle() {
        if (toggled === true) {
            closeMenu('.project-dropdown');
            setToggled(false);
        } else {
            openMenu('.project-dropdown');
            setToggled(true);
        }
    }

    return <>
        {loading ? <Loader /> :
            <div className="project p1">
                <div className="flex v-center mb-1">
                    <h1>{unescape(project.title)}</h1>
                    <div className="spacer"></div>

                    <div className="dropdown-toggler flex v-center pointer" onClick={toggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </div>
                    <div className="project-dropdown dropdown">
                        <div className="dropdown-wrapper" onClick={() => { closeMenu('.project-dropdown'); toggle() }}></div>
                        <div className="dropdown-menu">
                            <span className="pointer span-link" onClick={() => { openModal('.new-ticket-modal', '.modal-content'); toggle() }}>New Task</span>
                            {user.role === "admin" && <span className="pointer span-link" onClick={() => { openModal('.edit-project-modal', '.modal-content'); toggle() }}>Edit Project</span>}
                            {user.role === "admin" && <span className="pointer span-link" onClick={() => { openModal('.delete-project-modal', '.modal-content'); toggle() }}>Delete Project</span>}
                        </div>
                    </div>

                </div>
                <div className="project-details">
                    <span className="tag">Status: {project.status}</span>
                    <span className="tag">Priority: {project.priority}</span>
                    <p>{unescape(project.details)}</p>
                </div>

                {/* Tasks */}
                {project.tasks.length <= 0 && <h3 className="mt-1 mb-1">Project has no tickets</h3>}
                {project.tasks.length > 0 && <div>
                    <h3 className="mt-1 mb-1">Project Tasks</h3>
                    <Tasks onFormSubmit={loading => setLoading(loading)} tasks={project.tasks} />
                </div>}

                {/* New Task Modal */}
                <NewTask onFormSubmit={loading => setLoading(loading)} id={project._id} users={users}/>

                {/* Edit Project Modal */}
                <EditProject onFormSubmit={loading => setLoading(loading)} project={project} />

                {/* Delete Project Modal */}
                <DeleteProject onFormSubmit={loading => setLoading(loading)} project={project}/>

            </div>
        }
    </>;
}

export default Project;