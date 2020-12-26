import React, { useContext, useState, useMemo } from "react";
import { Auth } from "../../Contexts/Auth";
import { Global } from "../../Contexts/Global";
import { Link } from "react-router-dom";

import { openModal } from "../Shared/Animation";
import Loader from "../Shared/Loader";
import Details from "./Components/Details";
import Pagination from "./Components/Pagination";
import NewProject from "./Components/NewProject";
import "./dashboard.css";

function Dashboard() {

    const headers = [
        { name: "Title", field: "title", sortable: true, numeric: false },
        { name: "Status", field: "status", sortable: true, numeric: false },
        { name: "Tasks", field: "tasks", sortable: true, numeric: true },
        { name: "Priority", field: "priority", sortable: true, numeric: false },
        { name: "Action", field: "action", sortable: false, numeric: false }
    ];

    const ITEMS_PER_PAGE = 5;
    const { user } = useContext(Auth);
    const { projects } = useContext(Global);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ sort: false, field: "", order: true, numeric: false });
    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const projectData = useMemo(() => {
        let _projects = projects;

        if (search) {
            _projects = projects.filter(
                project =>
                    project.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sort.sort) {
            if (sort.numeric) {
                if (sort.order) {
                    _projects = projects.sort((a, b) => {
                        return a.tasks.length - b.tasks.length;
                    })
                } else {
                    _projects = projects.sort((a, b) => {
                        return b.tasks.length - a.tasks.length;
                    })
                }
            } else {
                let field = sort.field;
                if (sort.order) {
                    _projects = projects.sort((a, b) => {
                        if (a[field].toLowerCase() < b[field].toLowerCase()) {
                            return -1;

                        } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                } else {
                    _projects = projects.sort((a, b) => {
                        if (a[field].toLowerCase() < b[field].toLowerCase()) {
                            return 1;

                        } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                }
            }
            sort.sort = false;
        }

        setTotalPages(() => {
            let array = [];
            for (let i = 1; i <= Math.ceil(_projects.length / ITEMS_PER_PAGE); i++) {
                array.push(i);
            }
            return array;
        });

        return _projects.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [projects, currentPage, search, sort]);

    const filterProject = (value) => {
        setSearch(value);
        setCurrentPage(1);
    }

    const sortProject = (field, numeric) => {
        setSort({ sort: true, field, order: !sort.order, numeric });
    }

    return <div className="dashboard">
        {loading && <Loader />}
        <div className="container p1">

            <Details />

            <div className="projects">
                <div className="flex v-center">
                    <input
                        type="text"
                        className="search"
                        placeholder="Search"
                        value={search}
                        onChange={e => filterProject(e.target.value)}
                    />
                    <div className="spacer"></div>
                    <div className="col d-flex justify-content-end align-items-center">
                        {user.role === "admin" && <span className="pointer span-link flex v-center" onClick={() => openModal('.newProject', '.modal-content')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        New Project
                        </span>}
                    </div>
                </div>

                {/* Table */}
                <table className="table">
                    <thead>
                        <tr>
                            {headers.map(head => (
                                <th key={head.field} className="fitwidth">
                                    {head.name}
                                    {head.sortable ? <svg onClick={() => sortProject(head.field, head.numeric)} width="1rem" height="1rem" viewBox="0 0 16 16" className="pointer sort-icon bi bi-chevron-expand" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z" />
                                    </svg> : ''}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.map(project => (
                            <tr key={project._id}>
                                <td>{unescape(project.title)}</td>
                                <td className="fitwidth">{unescape(project.status)}</td>
                                <td className="fitwidth">{project.tasks.length}</td>
                                <td className="fitwidth white-color" style={{background: `var(--${project.priority})`}}>{project.priority}</td>
                                <td className="fitwidth">
                                    <Link to={`/project/${project._id}`}>Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>


        {/* New Project Modal */}
        <NewProject onFormSubmit={loading => setLoading(loading)}/>

    </div>;
}

export default Dashboard