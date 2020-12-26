import React from "react";
import { HashRouter, Switch } from "react-router-dom";
import { Private } from "../Route";
import GlobalProvider from "../Contexts/Global";
import Header from "./Shared/Header";
import Dashboard from "./Dashboard";
import Project from "./Project";
import Todos from "./Todos";


function Home() {


    return <GlobalProvider>
        <HashRouter>
            <Header />
            <div className="container">
                <Switch>
                    <Private exact path="/" component={Dashboard} />
                    <Private exact path="/project/:id" component={Project} />
                    <Private exact path="/todos" component={Todos} />
                </Switch>
            </div>
        </HashRouter>
    </GlobalProvider>;

}

export default Home