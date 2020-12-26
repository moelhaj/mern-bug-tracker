import React, { useContext, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Global } from "../../Contexts/Global";
import { Auth } from "../../Contexts/Auth";
import Loader from "./Loader";
import {openMenu, closeMenu} from "./Animation";


function Header() {

    const { todos } = useContext(Global);
    const { user } = useContext(Auth);
    const [loading, setLoading] = useState(false);
    const [toggled, setToggled] = useState(false);

    const images = require.context('../../Assets', true);
    let avatar = images(`./${user._id}.png`);

    const logout = () => {
        closeMenu('.header-dropdown');
        setLoading(true);
        sessionStorage.removeItem('sid');
        window.location.reload(false);
    }

    function toggle() {
        if (toggled === true) {
            closeMenu('.header-dropdown');
            setToggled(false);
        } else {
            openMenu('.header-dropdown');
            setToggled(true);
        }
    }

    return <div className="header">
        <div className="container flex header-padding v-center">
            <span className="logo unselectable">Bug Tracker</span>
            <div className="spacer"></div>
            <nav className="nav">
                <NavLink className="nav-link" exact activeClassName="active" to="/">Dashboard</NavLink>
                <NavLink className="nav-link" exact activeClassName="active" to="/todos">Todos{todos.length > 0 && <span className="badge">{todos.length}</span>}</NavLink>
            </nav>
            <img src={avatar} alt="avatar" />
            <span>{user.name}</span>
            <div className="dropdown-toggler flex v-center pointer" onClick={toggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div className="header-dropdown dropdown">
                <div className="dropdown-wrapper" onClick={() => closeMenu('.header-dropdown')}></div>
                <div className="dropdown-menu">
                    <span className="pointer span-link" onClick={logout}>Logout</span>
                </div>
            </div>
        </div>
        {loading && <Loader />}
    </div>;
}

export default withRouter(Header);